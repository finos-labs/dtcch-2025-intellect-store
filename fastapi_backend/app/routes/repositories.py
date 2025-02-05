from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import User, get_async_session
from app.models import Repository
from app.schemas import RepositoryRead, RepositoryCreate
from app.users import current_active_user

router = APIRouter(tags=["repository"])


@router.get("/", response_model=list[RepositoryRead])
async def read_repository(
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(select(Repository).filter(Repository.user_id == user.id))
    repositories = result.scalars().all()
    return [RepositoryRead.model_validate(repository) for repository in repositories]


@router.post("/", response_model=RepositoryRead)
async def create_repository(
    repository: RepositoryCreate,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
) -> Repository:
    repository_data = repository.model_dump()

    # Only convert to string if the field is not None
    if 'link' in repository_data:
        repository_data['link'] = str(repository_data['link'])
    if repository_data["pull_request_link"] == "None":
        repository_data["pull_request_link"] = None
    repository_data['pull_request_link'] = None
    print(f"Creating repository with data: {repository_data}")
    db_repository = Repository(**repository_data, user_id=user.id)
    print(f"Creating repository: {db_repository}")
    db.add(db_repository)
    await db.commit()
    await db.refresh(db_repository)
    return db_repository


@router.delete("/{repository_id}")
async def delete_repository(
    repository_id: UUID,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await db.execute(
        select(Repository).filter(Repository.id == repository_id, Repository.user_id == user.id)
    )
    repository = result.scalars().first()

    if not repository:
        raise HTTPException(status_code=404, detail="Repository not found or not authorized")

    await db.delete(repository)
    await db.commit()

    return {"message": "Repository successfully deleted"}
