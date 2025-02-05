from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import User, get_async_session
from app.models import Source
from app.schemas import SourceRead, SourceCreate, SourceUpdate
from app.users import current_active_user

router = APIRouter(tags=["source"])


@router.get("/", response_model=list[SourceRead])
async def read_sources(
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(select(Source).filter(Source.user_id == user.id))
    sources = result.scalars().all()
    return [SourceRead.model_validate(source) for source in sources]


@router.post("/", response_model=SourceRead)
async def create_source(
    source: SourceCreate,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    print(f"Creating source: {source}")
    source_data = source.model_dump()
    if 'link' in source_data:
        source_data['link'] = str(source_data['link'])
    db_source = Source(**source_data, user_id=user.id)
    db.add(db_source)
    await db.commit()
    await db.refresh(db_source)
    return db_source


@router.put("/{source_id}", response_model=SourceRead)
async def update_source(
    source_id: UUID,
    source_update: SourceUpdate,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(
        select(Source).filter(Source.id == source_id, Source.user_id == user.id)
    )
    db_source = result.scalars().first()

    if not db_source:
        raise HTTPException(status_code=404, detail="Source not found or not authorized")

    for key, value in source_update.dict(exclude_unset=True).items():
        setattr(db_source, key, value)
    db_source.last_updated = datetime.utcnow()

    await db.commit()
    await db.refresh(db_source)
    return db_source

@router.delete("/{source_id}", response_model=dict)
async def delete_source(
    source_id: UUID,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(
        select(Source).filter(Source.id == source_id, Source.user_id == user.id)
    )
    source = result.scalars().first()

    if not source:
        raise HTTPException(status_code=404, detail="Source not found or not authorized")

    await db.delete(source)
    await db.commit()

    return {"message": "Source successfully deleted"}
