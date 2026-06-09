import { NextResponse } from 'next/server';
import moment from 'moment';

type ReportType = {
    [key: string]: string;
}

const parseCsvRow = (row: string): string[] => {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
};


export const POST = async ( _req ) => {
    try{ 
        
        var {tokenAccess, deviceId, from, to} = await _req.json()
        
        if (!from) from = moment().subtract(1, "week").format("YYYY-MM-DD")
            if (!to) to = moment().format("YYYY-MM-DD")

        var url = `https://prd-freq.frequency.com/api/2.3/reports/program/schedules?from=${from}&to=${to}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-frequency-auth': tokenAccess,
                'x-frequency-deviceId': deviceId
            },
        });

        const data = await response.json()

        const reports: ReportType = data.hits[0]
        
        const csvParts: string[] = [];
        const seenAirings = new Set<string>();

        for (const [date, url] of Object.entries(reports)) {
            const res = await fetch(url);

            if (!res.ok) continue;

            const csv = await res.text();
            const lines = csv.trim().split(/\r?\n/);

            if (lines.length === 0) continue;

            const header = lines[0];

            if (csvParts.length === 0) {
                csvParts.push(header);
            }

            for (const row of lines.slice(1)) {
                const cleanColumns = parseCsvRow(row);

                const programStartTime = cleanColumns[2] || "";
                const programEndTime = cleanColumns[3] || "";
                const programId = cleanColumns[5] || "";

                const airingKey = `${programId}|${programStartTime}|${programEndTime}`;

                if (seenAirings.has(airingKey)) continue;

                seenAirings.add(airingKey);
                csvParts.push(row);
            }
        }

        const combinedCsv = csvParts.join("\n");

        return NextResponse.json({data: combinedCsv}, {
             headers: {
               "Content-Type": "application/json",
               "Cache-Control": "no-store"
             }
         });
        
    } catch (error) {
      console.log(error);
      return NextResponse.json({
                success: false,
                error: error
            }, {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store',
                }
        })
    }
}