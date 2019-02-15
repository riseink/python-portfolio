from django.db import models
from wagtail.core.models import Page

from flexcomponents.models import FlexLayoutFields
from socialmedia.mixins import SocialMetaTagsMixin


class HomePage(FlexLayoutFields, SocialMetaTagsMixin, Page):
    """HomePage model with FlexLayoutPage fields and social meta tags"""
    pass

