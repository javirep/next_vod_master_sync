type FrequencyLoginType = {
    country: string,
    device_id: string,
    token: {
        roles: string[],
        token_access: string,
        token_refresh: string
    }
    user_agent: string
}



export const getFrequencyLogin = async ( ) => {
    try{ 
        const response = await fetch("api/frequency/login", {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log(response)
        if (response.ok) {
            const data:FrequencyLoginType = await response.json();
            
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

export const getFrequencySchedule = async (deviceId: string, tokenAccess: string, from: string, to: string) => {
    try{ 
        console.log("POSTING TO API / FREQUENCY / SCHEDULE")
        const response = await fetch("api/frequency/schedule", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenAccess,
                deviceId, 
                from, 
                to
            })
        });
        
        if (response.ok) {
            const data = await response.json();

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