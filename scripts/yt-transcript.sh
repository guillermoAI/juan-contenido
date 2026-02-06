#!/bin/bash
# Extrae transcripción de un video de YouTube
# Uso: ./yt-transcript.sh VIDEO_URL_OR_ID [LANG]

VIDEO="$1"
LANG="${2:-es}"

if [ -z "$VIDEO" ]; then
    echo "Uso: ./yt-transcript.sh VIDEO_URL_OR_ID [LANG]"
    exit 1
fi

# Extraer ID si es URL completa
if [[ "$VIDEO" == *"youtube.com"* ]] || [[ "$VIDEO" == *"youtu.be"* ]]; then
    VIDEO_ID=$(echo "$VIDEO" | grep -oP '(?:v=|youtu\.be/)[\w-]+' | sed 's/v=//' | head -1)
else
    VIDEO_ID="$VIDEO"
fi

OUTPUT_DIR="/tmp/yt-transcripts"
mkdir -p "$OUTPUT_DIR"

# Descargar subtítulos
yt-dlp --write-auto-sub --sub-lang "$LANG,en" --skip-download --sub-format vtt \
    -o "$OUTPUT_DIR/%(id)s" "https://www.youtube.com/watch?v=$VIDEO_ID" 2>/dev/null

# Encontrar archivo de subtítulos
SUB_FILE=$(ls "$OUTPUT_DIR/$VIDEO_ID"*.vtt 2>/dev/null | head -1)

if [ -f "$SUB_FILE" ]; then
    # Limpiar formato VTT a texto plano
    grep -v "^WEBVTT" "$SUB_FILE" | grep -v "^Kind:" | grep -v "^Language:" | \
    grep -v "^[0-9][0-9]:[0-9][0-9]" | grep -v "^\s*$" | grep -v "^NOTE" | \
    sed 's/<[^>]*>//g' | tr '\n' ' ' | sed 's/  */ /g'
    echo ""
else
    echo "No se encontraron subtítulos para $VIDEO_ID"
fi
