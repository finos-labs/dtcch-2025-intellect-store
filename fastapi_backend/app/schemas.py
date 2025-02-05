import uuid
from datetime import datetime
from fastapi_users import schemas
from pydantic import BaseModel, HttpUrl, field_validator

from uuid import UUID


class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass


class RepositoryBase(BaseModel):
    name: str
    link: HttpUrl
    last_updated: datetime | None = None
    description: str | None = None
    pull_request_link: HttpUrl | None = None

class RepositoryCreate(RepositoryBase):
    pass


class RepositoryRead(RepositoryBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}


class SourceBase(BaseModel):
    name: str
    link: HttpUrl
    last_updated: datetime | None = None
    description: str | None = None


class SourceCreate(SourceBase):
    pass


class SourceUpdate(BaseModel):
    name: str | None = None
    link: HttpUrl | None = None
    last_updated: datetime | None = None
    description: str | None = None


class SourceRead(SourceBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}
