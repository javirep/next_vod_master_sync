import { NextResponse } from 'next/server';
import { getTitles, getSeries } from './masterTracker.service';

export async function GET() {
  const titles = await getTitles();
  const series = await getSeries();
  
  return NextResponse.json({
    titles: titles,
    series: series
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    }
  });
}
