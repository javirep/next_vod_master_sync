export const downloadFile = async (masterId: string, uuids: string[]) => {
    try {
        const response = await fetch('/api/generateFile' , {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuids,
                masterId,
            })
        });

        if (response.ok) {
            const data:any = await response.json();
            
            return data;
        } else {
            const { message } = await response.json();
            console.log(message);
            return false;
        }
    }
    catch (e) {
        console.log(e)
        return false
    }
}