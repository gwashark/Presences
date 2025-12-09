const presence = new Presence({
  clientId: '1447759235050901554',
})
const browsingTimestamp = Math.floor(Date.now() / 1000)

presence.on('UpdateData', async () => {
  const app = document.querySelector(".app")
  if (!app) return
  const lastElem = app.lastElementChild
  const presenceData: PresenceData = {
    largeImageKey: 'https://i.imgur.com/ZxuzvVj.png',
    startTimestamp: browsingTimestamp,
  }
  if (lastElem?.classList.contains("popup-chat")) {
    presenceData.state = 'Viewing Chat'
  } else if (lastElem?.classList.contains("popup-rules")) {
    presenceData.state = 'Viewing the Rules'
  } else if (lastElem?.classList.contains("page-main")) {
    presenceData.state = 'In Main Menu'
  } else if (lastElem?.classList.contains("page-leader-board")) {
    presenceData.state = 'Viewing Leaderboard'
  } else if (lastElem?.classList.contains("page-select-bot")) {
    presenceData.state = 'Selecting Bot Opponent'
  } else if (lastElem?.classList.contains("page-game")) {
    presenceData.state = 'In a Game'
  } else if (lastElem?.classList.contains("page-game-menu")) {
    presenceData.state = 'Game Paused'
  }

  presence.setActivity(presenceData)
})
