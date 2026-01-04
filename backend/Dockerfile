# Use a specific version for deterministic builds
FROM python:3.12-alpine

# Set environment variables for Python stability
# PYTHONDONTWRITEBYTECODE: Prevents Python from writing .pyc files to disk
# PYTHONUNBUFFERED: Ensures logs are sent straight to terminal without buffering
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# 1. Security: Create a non-root user for the application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 2. Dependency Management: Copy only requirements first to leverage Docker cache
COPY requirements.txt pyproject.toml .

# Install dependencies and clean up cache in one layer to minimize size
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
# 3. Source Code: Copy the rest of the application
# Use --chown to ensure the appuser owns the files from the start
COPY --chown=appuser:appgroup . .

# 4. Permissions: Switch to the non-root user
USER appuser

EXPOSE 9000

# 5. Execution: Use the "exec form" for proper signal handling (SIGTERM)
# Note: --reload should only be used for development, not production.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]
