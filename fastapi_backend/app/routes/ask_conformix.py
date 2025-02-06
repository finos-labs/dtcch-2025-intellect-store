from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.database import User, get_async_session
from app.models import Repository, Source
from app.schemas import AskConformixRequest, SourceRead, SourceCreate, SourceUpdate
from app.users import current_active_user
from app.utils import get_llm_client

router = APIRouter(tags=["ask-conformix"])

@router.post("/", response_model=str)
async def ask_conformix(
    source: AskConformixRequest,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    repository = await db.execute(select(Repository).filter(Repository.id == source.repository_id, Repository.user_id == user.id))
    db_repository = repository.scalar_one_or_none()
    if db_repository is None:
        raise HTTPException(status_code=404, detail="Repository not found")
    
    llm = get_llm_client()

    result = llm.invoke(
        "What is the capital of France?"
    )
    print(result)
    return result