import uuid
from datetime import datetime
try:
    from fastapi_users import schemas
except ImportError:
    # Add this to your requirements.txt:
    # fastapi-users
    pass
try:
    from pydantic import BaseModel, HttpUrl
except ImportError:
    # Add this to your requirements.txt:
    # pydantic
    pass
from uuid import UUID


class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass


class ItemBase(BaseModel):
    name: str
    description: str | None = None
    quantity: int | None = None


class ItemCreate(ItemBase):
    pass


class ItemRead(ItemBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}


class SourceBase(BaseModel):
    name: str
    link: HttpUrl
    last_updated: datetime | None = None


class SourceCreate(SourceBase):
    pass


class SourceUpdate(BaseModel):
    name: str | None = None
    link: HttpUrl | None = None
    last_updated: datetime | None = None


class SourceRead(SourceBase):
    id: UUID
    user_id: UUID

    model_config = {"from_attributes": True}
