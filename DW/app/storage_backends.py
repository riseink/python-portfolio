from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
from django.contrib.staticfiles.storage import ManifestFilesMixin


# TODO: verify that ManifestFilesMixin adds hashes to static files
class StaticS3Storage(ManifestFilesMixin, S3Boto3Storage):
    """Subclass of S3Boto3Storage used for static files"""
    location = settings.STATICFILES_LOCATION


class MediaS3Storage(S3Boto3Storage):
    """Subclass of S3Boto3Storage used for media files

    Keeps media items in a media/ subdirectory and prevents file overwrites
    """
    location = settings.MEDIAFILES_LOCATION
    file_overwrite = False

