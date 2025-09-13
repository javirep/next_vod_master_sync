import { NextResponse } from 'next/server';
import { getTitles, getSeries } from './masterTracker.service';

export async function GET() {
  const titles = await getTitles();
  const series = await getSeries();

  titles.forEach( title => {
    title.series = series[title.seriesTitle]
  })
  
  return NextResponse.json({
    titles: titles
  }, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    }
  });
}
