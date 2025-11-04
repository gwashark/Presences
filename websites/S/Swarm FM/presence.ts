import { ActivityType, Assets } from 'premid'

const presence = new Presence({
  clientId: '1435322520076161156',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

enum ActivityAssets {
  Logo = 'https://i.imgur.com/2MCaju5.png',
}

presence.on('UpdateData', async () => {
  const presenceData: PresenceData = {
    largeImageKey: ActivityAssets.Logo,
    startTimestamp: browsingTimestamp,
    smallImageKey: Assets.Play,
    state: "Listening",
    type: ActivityType.Listening
  }

  presence.setActivity(presenceData)
})

