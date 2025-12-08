API_URL = "https://api.ezhoroscope.com/api/Horoscope/chinese-zodiac?"

const zodiacDescriptions = {
    "Rat": {
        symbol: "🐀",
        description: "Clever, resourceful, and quick-thinking. Thrives in challenges and adapts easily. Can be opportunistic but charming."
    },
    "Ox": {
        symbol: "🐂",
        description: "Dependable, hardworking, and steady. Values tradition and persistence. Sometimes stubborn but deeply loyal."
    },
    "Tiger": {
        symbol: "🐅",
        description: "Bold, confident, and adventurous. Natural leader with strong charisma. Impulsive yet passionate in pursuits."
    },
    "Rabbit": {
        symbol: "🐇",
        description: "Gentle, kind, and diplomatic. Prefers harmony and avoids conflict. Sensitive but highly intuitive."
    },
    "Dragon": {
        symbol: "🐉",
        description: "Ambitious, energetic, and visionary. Magnetic presence with strong willpower. Can be demanding but inspiring."
    },
    "Snake": {
        symbol: "🐍",
        description: "Wise, mysterious, and analytical. Values privacy and deep thinking. Elegant but sometimes secretive."
    },
    "Horse": {
        symbol: "🐎",
        description: "Energetic, free-spirited, and social. Loves independence and adventure. Can be restless yet optimistic."
    },
    "Goat": {
        symbol: "🐐",
        description: "Creative, compassionate, and gentle. Seeks peace and artistic expression. Sometimes indecisive but empathetic."
    },
    "Monkey": {
        symbol: "🐒",
        description: "Playful, witty, and inventive. Thrives on curiosity and cleverness. Can be mischievous but adaptable."
    },
    "Rooster": {
        symbol: "🐓",
        description: "Confident, observant, and hardworking. Straightforward with strong principles. Sometimes perfectionist but reliable."
    },
    "Dog": {
        symbol: "🐕",
        description: "Loyal, honest, and protective. Values justice and fairness. Can be cautious but deeply caring."
    },
    "Pig": {
        symbol: "🐖",
        description: "Generous, warm, and easygoing. Enjoys comfort and simple pleasures. Trusting, sometimes overly indulgent."
    }
};

const zodiacElements = {
    Metal: "metal",
    Water: "water",
    Wood: "wood",
    Fire: "fire",
    Earth: "earth"
};

function SetPath() {
    let birthday = new Date(document.getElementById("birthday").value);
    let day = birthday.getDate();
    let month = birthday.getMonth();
    let year = birthday.getFullYear();
    return `birthDate=${month}%2F${day}%2F${year}&apikey=test`;
}

async function DisplayZodiac() {
    const res = await fetch(`${API_URL}${SetPath()}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

async function ShowZodiac() {
    try {
        const data = await DisplayZodiac();
        const birthday = new Date(document.getElementById("birthday").value);

        // Easter egg for 4/20
        if (birthday.getMonth() === 3 && birthday.getDate() === 20) {
            document.getElementById("zodiac").innerHTML = `🌿 Your Chinese Zodiac Sign is: <b>The Blazing Dragon 🐉💨</b>
            <br><br>
            Element of<br><br><span class="fire">High Vibes</span>
            <br><br>
            Born on 4/20, you possess the mystical power of ultimate chill. Your spirit animal is perpetually relaxed and always finds the munchies. Highly compatible with Doritos and good times. 😎`;
            return;
        }

        document.getElementById("zodiac").innerHTML = `Your Chinese Zodiac Sign is:
        <b>
        ${zodiacDescriptions[data.animal].symbol} ${data.animal}</b>
        <br><br>
        Element of<br><br><span class="${zodiacElements[data.element]}">${data.element}</span>
        <br><br>
        ${zodiacDescriptions[data.animal].description}`;
    } catch (error) {
        document.getElementById("zodiac").innerHTML = `
        🐞 The Debugger Beetle<br><br>
        Lives between console logs and stack traces. 
        <br>Patient, persistent, and always finds what you forgot to test.
        <br>Destined to haunt staging servers at 3 AM.`;
    }
}