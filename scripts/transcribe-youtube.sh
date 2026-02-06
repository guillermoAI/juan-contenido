#!/bin/bash
# Descarga video de YouTube + transcribe con Whisper
# Uso: ./transcribe-youtube.sh VIDEO_URL OUTPUT_DIR [LANG]

export PATH="/root/.deno/bin:$PATH"

VIDEO_URL="$1"
OUTPUT_DIR="$2"
LANG="${3:-es}"

if [ -z "$VIDEO_URL" ] || [ -z "$OUTPUT_DIR" ]; then
    echo "Uso: ./transcribe-youtube.sh VIDEO_URL OUTPUT_DIR [LANG]"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Extraer ID del video
if [[ "$VIDEO_URL" == *"youtube.com"* ]] || [[ "$VIDEO_URL" == *"youtu.be"* ]]; then
    VIDEO_ID=$(echo "$VIDEO_URL" | grep -oP '(?:v=|youtu\.be/)[\w-]+' | sed 's/v=//' | head -1)
else
    VIDEO_ID="$VIDEO_URL"
fi

echo "Descargando audio de $VIDEO_ID..."
# Descargar solo audio en formato m4a
yt-dlp -f "bestaudio[ext=m4a]" \
    -o "$OUTPUT_DIR/%(id)s.%(ext)s" \
    --quiet \
    "https://www.youtube.com/watch?v=$VIDEO_ID"

# Transcribir con Whisper
AUDIO_FILE="$OUTPUT_DIR/${VIDEO_ID}.m4a"
if [ -f "$AUDIO_FILE" ]; then
    echo "Transcribiendo con Whisper (idioma: $LANG)..."
    whisper "$AUDIO_FILE" --model small --language $LANG --output_format txt -o "$OUTPUT_DIR" --quiet
    
    # Limpiar audio descargado
    rm "$AUDIO_FILE"
    
    # Resultado
    TXT_FILE="$OUTPUT_DIR/${VIDEO_ID}.txt"
    if [ -f "$TXT_FILE" ]; then
        echo "✓ Transcripción completada: $TXT_FILE"
        echo "  Palabras: $(wc -w < $TXT_FILE)"
    fi
else
    echo "Error descargando audio"
    exit 1
fi
