

export const getRokuEPG = async ( channelId: string = '253' ) => {
    try{ 
        const response = await fetch('/api/EPGs/Roku/' + channelId, {
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

export const getFrequencyEPG = async ( channelId: string = '253' ) => {
    try{ 
        const response = await fetch('/api/EPGs/Frequency/' + channelId, {
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

export const getGracenoteEPG = async () => {
    try{ 
        const response = await fetch('/api/EPGs/Gracenote', {
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