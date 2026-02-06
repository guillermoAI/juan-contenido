#!/bin/bash
# Descarga transcripciones en batch de un canal
# Uso: ./batch-transcripts.sh CHANNEL_DIR [MAX_VIDEOS]

export PATH="/root/.deno/bin:$PATH"

CHANNEL_DIR="$1"
MAX_VIDEOS="${2:-50}"

if [ -z "$CHANNEL_DIR" ] || [ ! -f "$CHANNEL_DIR/video-list.txt" ]; then
    echo "Uso: ./batch-transcripts.sh CHANNEL_DIR [MAX_VIDEOS]"
    exit 1
fi

cd "$CHANNEL_DIR"
mkdir -p vtt clean

COUNT=0
while IFS='|' read -r vid title; do
    if [ $COUNT -ge $MAX_VIDEOS ]; then break; fi
    
    if [ -f "vtt/${vid}.en.vtt" ]; then
        echo "Skip: $vid (ya existe)"
        continue
    fi
    
    echo "[$COUNT/$MAX_VIDEOS] Descargando: $title"
    yt-dlp --write-auto-subs --sub-lang "en" --skip-download \
        -o "vtt/%(id)s" "https://www.youtube.com/watch?v=$vid" 2>/dev/null
    
    # Convertir a texto limpio
    if [ -f "vtt/${vid}.en.vtt" ]; then
        grep -v "^WEBVTT" "vtt/${vid}.en.vtt" | grep -v "^Kind:" | grep -v "^Language:" | \
        grep -v "^[0-9][0-9]:[0-9][0-9]" | grep -v "^\s*$" | grep -v "^NOTE" | grep -v "^align:" | grep -v "^position:" | \
        sed 's/<[^>]*>//g' | tr '\n' ' ' | sed 's/  */ /g' > "clean/${vid}.txt"
        echo "  -> OK ($(wc -w < clean/${vid}.txt) palabras)"
    fi
    
    COUNT=$((COUNT + 1))
    sleep 1
done < video-list.txt

echo "Completado: $COUNT videos procesados"
