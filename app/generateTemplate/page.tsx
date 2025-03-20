'use server';
import GenerateTemplateComponent from './clientComponent';
import { getTitles } from '../services/GoogleSheetsAPI';

export default async function Page () {
  const titles = (await getTitles())
  
  return <GenerateTemplateComponent titles={titles}/>
}
