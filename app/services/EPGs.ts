

export const getRokuEPG = async () => {
    try{ 
        const response = await fetch('/api/EPGs/Roku', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data:any = await response.json();
            
            return data;
        } else {
            const { message } = await response.json();
            console.log(message);
            return false;
        }
    } catch (error) {
      console.log(error);
      return false;
    }

}