import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const track = searchParams.get('track');
  const artist = searchParams.get('artist') || 'Stray Kids';
  

  if (!track) {
    return NextResponse.json({ error: 'Track name is required' }, { status: 400 });
  }

  try {
    // Usando a iTunes API (simples e sem Key)
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(artist + " " + track)}&entity=song&limit=1`
    );
    const data = await response.json();

    if (data.results.length === 0) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 });
    }

    const song = data.results[0];

    return NextResponse.json({
      previewUrl: song.previewUrl,
      artwork: song.artworkUrl100.replace('100x100bb', '500x500bb'), // Pega a capa em alta resolução
      trackName: song.trackName,
      artistName: song.artistName
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}