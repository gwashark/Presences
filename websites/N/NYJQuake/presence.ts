import { ActivityType } from "premid"

const presence = new Presence({
  clientId: '1447470809760399474',
})

const browsingTimestamp = Math.floor(Date.now() / 1000)

const depthRegex = new RegExp('([0-9]+)km')
const magnitudeRegex = new RegExp('M([0-9.]+)')
const intensityRegex = new RegExp('([0-9-+]+)(?:\\s|$)')

// Location translation map
const locationTranslations: { [key: string]: string } = {
  '대만': 'Taiwan',
  '일본': 'Japan',
  '한국': 'South Korea',
  '남한': 'South Korea',
  '북한': 'North Korea',
}

function determineCountry(location: string): string {
  if (!location) return 'Unknown'
  
  // Check for location keywords to determine country
  if (location.includes('대만') || location.includes('Taiwan')) return 'Taiwan'
  if (location.includes('일본') || location.includes('Japan')) return 'Japan'
  if (location.includes('한국') || location.includes('Korea')) return 'South Korea'
  if (location.includes('북한') || location.includes('North Korea')) return 'North Korea'
  
  // Default to unknown
  return 'Unknown'
}

function translateLocation(koreanLocation: string): string {
  if (!koreanLocation) return 'Unknown Location'
  
  let translatedLocation = koreanLocation
  
  // Replace Korean keywords with English
  Object.entries(locationTranslations).forEach(([korean, english]) => {
    translatedLocation = translatedLocation.replace(korean, english)
  })
  
  return translatedLocation
}

presence.on('UpdateData', async () => {
  const firstElem = document.querySelector("#eventList")?.firstElementChild
  const presenceData: PresenceData = {
    type: ActivityType.Watching,
    largeImageKey: 'https://i.imgur.com/7yORozz.png',
    startTimestamp: browsingTimestamp,
  }

  if (!firstElem) {
    presenceData.state = 'Information Unavailable'
  } else if (firstElem.id === "eq") {
    presenceData.smallImageKey = 'https://page.nyj36.xyz/nyjquake/img/eq.webp'
    presenceData.smallImageText = 'Earthquake Information'
    
    const magText = firstElem.querySelector(".mag")?.textContent?.trim()
    const depthText = firstElem.querySelector(".dep")?.textContent?.trim()
    const intensityText = firstElem.querySelector(".maxInt")?.textContent?.trim()
    const locationText = firstElem.querySelector(".loc")?.textContent?.trim()
    const title = firstElem.querySelector(".title")?.textContent?.trim()
    
    const magnitude = magText ? magnitudeRegex.exec(magText)?.[1] : 'N/A'
    const depth = depthText ? depthRegex.exec(depthText)?.[0] : 'N/A'
    const intensity = intensityText ? intensityText : 'N/A'
    const country = locationText ? determineCountry(locationText) : 'Unknown'
    
    presenceData.details = `M${magnitude} | ${country}`
    presenceData.state = `Depth: ${depth} | Intensity: ${intensity}`
    
    if (title) {
      presenceData.buttons = [{
        label: 'View Details',
        url: 'https://page.nyj36.xyz/nyjquake/',
      }]
    }
  } else if (firstElem.id === "eew") {
    presenceData.smallImageKey = 'https://page.nyj36.xyz/nyjquake/img/eew.webp'
    presenceData.smallImageText = 'Earthquake Early Warning'
    
    const magText = firstElem.querySelector(".mag")?.textContent?.trim()
    const depthText = firstElem.querySelector(".dep")?.textContent?.trim()
    const intensityText = firstElem.querySelector(".maxInt")?.textContent?.trim()
    const locationText = firstElem.querySelector(".loc")?.textContent?.trim()
    
    const magnitude = magText ? magnitudeRegex.exec(magText)?.[1] : 'N/A'
    const depth = depthText ? depthRegex.exec(depthText)?.[0] : 'N/A'
    const intensity = intensityText ? intensityText : 'N/A'
    const country = locationText ? determineCountry(locationText) : 'Unknown'
    
    presenceData.details = 'Early Earthquake Warning'
    presenceData.state = `M${magnitude} | ${country}`
    
    presenceData.buttons = [{
      label: 'View Alert',
      url: 'https://page.nyj36.xyz/nyjquake/',
    }]
  }

  presence.setActivity(presenceData)
})
