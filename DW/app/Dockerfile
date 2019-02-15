FROM python:3.6-slim

# 1 if we're running in production
# (Default: 0)
ARG ENV_PROD=0

# ----------------------------------------------------------------
# Install core packages
# ----------------------------------------------------------------
RUN apt-get update -qq && apt-get install -y build-essential default-libmysqlclient-dev curl git \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get update && apt-get install -y nodejs


# ----------------------------------------------------------------
# Setup SSH keys
# ----------------------------------------------------------------
RUN mkdir /root/.ssh/
ADD ./etc/id_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
ADD ./etc/id_rsa.pub /root/.ssh/id_rsa.pub
RUN touch /root/.ssh/known_hosts
# Remove host checking
RUN echo "Host bitbucket.org\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config


# ----------------------------------------------------------------
# Install python/node packages
# ----------------------------------------------------------------
RUN mkdir /app
COPY install-requirements.sh requirements.txt requirements-dev.txt package.json /app/

# Install requirements based on ENV_PROD
RUN /app/install-requirements.sh $ENV_PROD


# ----------------------------------------------------------------
# Install Wagtail foundation components
# ---------------------------------------------------------------- 
COPY ./src /app/src

# (For dev environment)
# Using method from this blog post to get around docker's limitations
# with python local packages:
# https://thekev.in/blog/2016-11-18-python-in-docker/index.html
# package directories need to be added to PYTHONPATH. This value is passed as a
# build arg in install.sh
ARG PYTHONPATH
ENV PYTHONPATH=$PYTHONPATH

# Install components
# Script will handle appropriately based on value of ENV_PROD
RUN /app/src/install-components.sh $ENV_PROD


COPY . /app
WORKDIR /app

