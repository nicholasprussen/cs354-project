## Description:
A chrome extension that enables the user to have various entertainment sites overlayed upon their current site's content, in a resizeable and moveable frame. 

## Authors: 
Nicholas Prussen, Oscar Filson, Adam Berridge, Ali Elshafei

## Setup:

### Step 1: Download the Project
Go to https://github.com/nicholasprussen/cs354-project and download the ZIP of the project to your computer

### Step 2: Extract the ZIP file
Extract the ZIP file from downloads and put it in a directory you will be able to find later.

### Step 3: Open Google Extension Manager
Open Google Chrome go to chrome://extensions/

### Step 4: Put Google Extension Manager on Developer Mode
In the extension manager, click the toggle in the top right titled "Developer Mode" 
You should now see 3 buttons; "Load unpacked", "Pack Extension", and "Update" on the upper left side of the screen. 

### Step 5: Add Extension to Chrome
In the extension manager, click the "Load Unpacked" button on the upper left side of the screen. 
Find the directory where you saved the extracted ZIP file and load that folder

### Step 6: Pin Extension to Toolbar
In Google Chrome, click the puzzle piece icon in the top right corner, and click the pin icon next to "The Ultimate Anti-Productivity Tool"

### The Extension is now active on your google chrome. 
If you are a beta tester, follow this link to the related survey: https://forms.gle/45R95cetiWs2kVit9

### Notes
- The extension has issues on some websites, Google.com consistently works as expected and is a good site for testing feature.

### Usage
- The 'X' icon on the top right of window closes the extension completely.
- The minimize icon on the top right of the window closes open content in the extension. 
- The options page can be reached by right-clicking on the extension icon in chrome and selecting options. Preferences are automatically saved upon any change. 
- To use the YouTube implementation, submit the link to the video.
- To use the Twitch implementation, submit the channel name.
- To use the Reddit implementation, submit the subreddit name with no 'r/'
- To use the Spotify implementation, submit the song/album/playlist link from Spotify.
- To use the Twitter implementation, submit the twitter handle of a individual's profile. 

## Known Issues/Bugs
- While on some websites (ex. Google Forms), pressing enter in the search bar of the extension caused another function not related to the extension (ie. reload page or open in new tab).
- Some websites block the reddit content.
- Some websites cause the window to close upon interaction.
- If you right click a link and choose 'Copy link address' it is a different link than simply copying the link, and is an invalid link for the extension. 
- When resizing and moving, the window was very large and couldn't be moved down even though there was some space in the page.
- If an empty string is submitted to the Spotify implementation, a google drive window is brought up.

## Future Features
- Implementing more commonly used sites such as Instagram, Wikipedia, translation sites (ie. Google Translate), various emails, and Amazon.
- Update close content icon.
- The Spotify implementation improved to use the Spotify API to search for songs, albums and playlists rather than needing a related URL. 
- Resizing is possible from all sides of the window, not just the bottom and right side.
- A submit button to the options page that makes it more clear to users that their changes have been saved
- A gear icon in the popup menu that directs to the options page
- A 'r/' in front of text for the Reddit implementation
- Extension loads when activeTab changes

## Version 0.1 BETA
