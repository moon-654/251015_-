const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const meridiemEl = document.getElementById("meridiem");
const dateEl = document.getElementById("date");
const timezoneLabelEl = document.getElementById("timezone-label");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const mapTitleEl = document.getElementById("map-title");
const mapHintEl = document.getElementById("map-hint");
const languageToggle = document.getElementById("language-toggle");

const cityElements = Array.from(document.querySelectorAll(".city"));

const translations = {
    ko: {
        title: "세계 타임 키퍼",
        subtitle: "현재 시각을 한눈에",
        mapTitle: "세계 주요 도시",
        mapHint: "도시를 클릭하면 해당 시간대를 볼 수 있습니다.",
        languageToggle: "English",
        meridiem: { AM: "오전", PM: "오후" },
        day: "낮",
        night: "밤",
        timezoneLabel: (city, offset) => `${city} (${offset})`,
    },
    en: {
        title: "Global Time Keeper",
        subtitle: "Everything in one glance",
        mapTitle: "World Cities",
        mapHint: "Click a city to switch the timezone.",
        languageToggle: "한국어",
        meridiem: { AM: "AM", PM: "PM" },
        day: "Day",
        night: "Night",
        timezoneLabel: (city, offset) => `${city} (${offset})`,
    },
};

const cityDictionary = {
    "los-angeles": { ko: "로스앤젤레스", en: "Los Angeles" },
    "new-york": { ko: "뉴욕", en: "New York" },
    london: { ko: "런던", en: "London" },
    dubai: { ko: "두바이", en: "Dubai" },
    seoul: { ko: "서울", en: "Seoul" },
    tokyo: { ko: "도쿄", en: "Tokyo" },
    sydney: { ko: "시드니", en: "Sydney" },
    "sao-paulo": { ko: "상파울루", en: "Sao Paulo" },
};

let language = "ko";
let selectedCityKey = "seoul";
let currentTimezone = "Asia/Seoul";

const previousTime = {
    minute: null,
    second: null,
};

const timeFormatterCache = new Map();
const offsetFormatterCache = new Map();
const hourFormatterCache = new Map();
const dateFormatterCache = new Map();

function getTimeFormatter(timezone) {
    if (!timeFormatterCache.has(timezone)) {
        timeFormatterCache.set(
            timezone,
            new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
                fractionalSecondDigits: 3,
                timeZone: timezone,
            }),
        );
    }
    return timeFormatterCache.get(timezone);
}

function getOffsetFormatter(timezone) {
    if (!offsetFormatterCache.has(timezone)) {
        offsetFormatterCache.set(
            timezone,
            new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                timeZoneName: "shortOffset",
                hour: "2-digit",
                minute: "2-digit",
            }),
        );
    }
    return offsetFormatterCache.get(timezone);
}

function getHourFormatter(timezone) {
    if (!hourFormatterCache.has(timezone)) {
        hourFormatterCache.set(
            timezone,
            new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                hour: "2-digit",
                hour12: false,
            }),
        );
    }
    return hourFormatterCache.get(timezone);
}

function getDateFormatter(locale, timezone) {
    const cacheKey = `${locale}-${timezone}`;
    if (!dateFormatterCache.has(cacheKey)) {
        dateFormatterCache.set(
            cacheKey,
            new Intl.DateTimeFormat(locale, {
                timeZone: timezone,
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        );
    }
    return dateFormatterCache.get(cacheKey);
}

function clearDateFormatterCache() {
    dateFormatterCache.clear();
}

function pad(value, length = 2) {
    return value.toString().padStart(length, "0");
}

function triggerImpact(element) {
    element.classList.remove("impact");
    // Force a reflow so the animation can restart.
    void element.offsetWidth;
    element.classList.add("impact");
}

function setText(target, value) {
    if (target.textContent !== value) {
        target.textContent = value;
    }
}

function updateLanguageTexts() {
    const strings = translations[language];
    titleEl.textContent = strings.title;
    subtitleEl.textContent = strings.subtitle;
    mapTitleEl.textContent = strings.mapTitle;
    mapHintEl.textContent = strings.mapHint;
    languageToggle.textContent = strings.languageToggle;
    document.documentElement.lang = language === "ko" ? "ko" : "en";
}

function updateCityStates(baseDate) {
    const strings = translations[language];

    cityElements.forEach((city) => {
        const { timezone, cityKey } = city.dataset;
        const hourString = getHourFormatter(timezone).format(baseDate);
        const hourValue = Number.parseInt(hourString, 10);
        const isDay = hourValue >= 6 && hourValue < 18;
        const periodKey = isDay ? "day" : "night";
        const cityNames = cityDictionary[cityKey] ?? { ko: cityKey, en: cityKey };

        city.classList.toggle("is-day", isDay);
        city.classList.toggle("is-night", !isDay);

        const nameEl = city.querySelector(".city-name");
        if (nameEl) {
            nameEl.textContent = cityNames[language] ?? cityKey;
        }

        const periodEl = city.querySelector(".city-period");
        if (periodEl) {
            periodEl.textContent = strings[periodKey];
        }

        const ariaLabel = `${cityNames[language] ?? cityKey} - ${strings[periodKey]}`;
        city.setAttribute("aria-label", ariaLabel);
    });
}

function updateActiveCity() {
    cityElements.forEach((city) => {
        const isActive = city.dataset.cityKey === selectedCityKey;
        city.classList.toggle("is-active", isActive);
        city.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
}

function updateClock() {
    const baseDate = new Date();
    const strings = translations[language];
    const timeParts = getTimeFormatter(currentTimezone).formatToParts(baseDate);

    const getPart = (type) => timeParts.find((part) => part.type === type)?.value ?? "";

    const hour = pad(getPart("hour"));
    const minute = pad(getPart("minute"));
    const second = pad(getPart("second"));
    const fractional = getPart("fractionalSecond");
    const milliseconds = fractional ? fractional.padEnd(3, "0").slice(0, 3) : pad(baseDate.getMilliseconds(), 3);
    const dayPeriod = (getPart("dayPeriod") || "AM").toUpperCase();

    if (minute !== previousTime.minute) {
        triggerImpact(minutesEl);
        previousTime.minute = minute;
    }

    if (second !== previousTime.second) {
        triggerImpact(secondsEl);
        previousTime.second = second;
    }

    setText(hoursEl, hour);
    setText(minutesEl, minute);
    setText(secondsEl, second);
    setText(millisecondsEl, milliseconds);
    setText(meridiemEl, strings.meridiem[dayPeriod] ?? dayPeriod);

    const locale = language === "ko" ? "ko-KR" : "en-US";
    const dateFormatter = getDateFormatter(locale, currentTimezone);
    setText(dateEl, dateFormatter.format(baseDate));

    const offsetParts = getOffsetFormatter(currentTimezone).formatToParts(baseDate);
    const offset = offsetParts.find((part) => part.type === "timeZoneName")?.value ?? "";
    const cityNames = cityDictionary[selectedCityKey] ?? { ko: selectedCityKey, en: selectedCityKey };
    const cityLabel = cityNames[language] ?? selectedCityKey;
    setText(timezoneLabelEl, strings.timezoneLabel(cityLabel, offset));

    updateCityStates(baseDate);
}

function selectCity(city) {
    if (!city) {
        return;
    }
    selectedCityKey = city.dataset.cityKey;
    currentTimezone = city.dataset.timezone;
    updateActiveCity();
    updateClock();
}

cityElements.forEach((city) => {
    city.addEventListener("click", () => {
        selectCity(city);
    });
});

languageToggle.addEventListener("click", () => {
    language = language === "ko" ? "en" : "ko";
    clearDateFormatterCache();
    updateLanguageTexts();
    updateClock();
});

const initialCity = cityElements.find((city) => city.dataset.cityKey === selectedCityKey) ?? cityElements[0];
if (initialCity) {
    selectedCityKey = initialCity.dataset.cityKey;
    currentTimezone = initialCity.dataset.timezone;
}

updateLanguageTexts();
updateActiveCity();
updateClock();
setInterval(updateClock, 75);
