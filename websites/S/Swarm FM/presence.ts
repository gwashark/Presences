import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1435322520076161156',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

enum ActivityAssets {
  Logo = 'https://i.imgur.com/2MCaju5.png',
}

presence.on('UpdateData', async () => {
  let details = 'Unknown song'
  let state = 'Unknown artist'
  let artwork: ActivityAssets | string = ActivityAssets.Logo
  let playing = true

  // website has first-party support of PreMiD, fetch the song data from data attributes
  const premid_data_element = document.getElementById('premid')
  if (premid_data_element) {
    details = premid_data_element.dataset.title ?? details
    state = premid_data_element.dataset.artist ?? state
    artwork = premid_data_element.dataset.artwork ?? artwork
  }

  const video_elements = document.getElementsByTagName('video')
  if (video_elements.length > 0) {
    const video_element = video_elements[0]!
    playing = !video_element.paused
  }

  const presenceData: PresenceData = {
    largeImageKey: artwork,
    startTimestamp: browsingTimestamp,
    smallImageKey: playing ? Assets.Play : Assets.Pause,
    name: 'Swarm FM',
    details,
    state,
    type: ActivityType.Listening,
  }

  await presence.setActivity(presenceData)
})
