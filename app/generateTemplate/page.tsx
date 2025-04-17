'use server';
import GenerateTemplateComponent from './clientComponent';
import { getTitles, getSeries} from '../services/GoogleSheetsAPI';

export default async function Page () {
  const titles = await getTitles()
  const series = await getSeries()

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    if (title.series) {
      const seriesTitle = series[title.series];
      if (seriesTitle) {
        title.seriesName = seriesTitle.seriesName;
        title.seriesLicensor = seriesTitle.seriesLicensor;
        title.seriesSlingId = seriesTitle.seriesSlingId;
        title.seriesSynopsis = seriesTitle.seriesSynopsis;
        title.seriesShortSynopsis = seriesTitle.seriesShortSynopsis;
        title.seriesArtFileName = seriesTitle.seriesArtFileName;
      }
    }
  }
  
  return <GenerateTemplateComponent titles={titles} />
}
