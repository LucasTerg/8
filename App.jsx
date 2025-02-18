import React, { useState, useEffect, useRef } from 'react'
import VideoPlayer from './src/components/VideoPlayer'
import DownloadButton from './src/components/DownloadButton'
import ThemeSwitcher from './src/components/ThemeSwitcher'
import './src/styles.css'
import poster1 from './src/img/1.webp'
import poster2 from './src/img/2.webp'
import poster3 from './src/img/3.webp'
import poster4 from './src/img/4.webp'
import poster5 from './src/img/5.webp'
import poster6 from './src/img/6.webp'

const App = () => {
    const defaultUrl = 'https://filedn.eu/lPq6O1K7j8DR1n7JwTuYjYz/7ooOOKjskks39jdhhdooommcooodkkywrrqbnx.mp4'
    const posterImages = [poster1, poster2, poster3, poster4, poster5, poster6]
    const getRandomPoster = () => posterImages[Math.floor(Math.random() * posterImages.length)]
    const [theme, setTheme] = useState('dark')
    const [videoUrl, setVideoUrl] = useState('')
    const [currentVideoUrl, setCurrentVideoUrl] = useState(defaultUrl)
    const [posterUrl, setPosterUrl] = useState(getRandomPoster())
    const fileInputRef = useRef(null)
    const dropZoneRef = useRef(null)

    useEffect(() => {
        document.body.className = theme
    }, [theme])

    const handleUrlChange = event => {
        setVideoUrl(event.target.value)
    }

    const handleInputHover = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setVideoUrl(text)
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err)
        }
    }

    const loadVideo = () => {
        setCurrentVideoUrl(videoUrl || defaultUrl)
        setPosterUrl(getRandomPosterUrl)
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            loadVideo()
        }
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            setCurrentVideoUrl(fileUrl)
            setPosterUrl(getRandomPoster())
        }
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file) {
            const fileUrl = URL.createObjectURL(file)
            setCurrentVideoUrl(fileUrl)
            setPosterUrl(getRandomPoster())
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    return (
			<div className='app'>
				<h1></h1>
				<div className='video-url-input'>
					<input
						type='text'
						value={videoUrl}
						onChange={handleUrlChange}
						onMouseEnter={handleInputHover}
						onKeyPress={handleKeyPress}
						placeholder='Wentyluj frustrację, wklej link do filmu!'
					/>
					<button onClick={loadVideo}>Załaduj</button>
				</div>
				<div className='video-player'>
					<video controls key={currentVideoUrl} poster={posterUrl}>
						<source src={currentVideoUrl} type='video/mp4' />
						Twoja przeglądarka nie obsługuje odtwarzacza wideo.
					</video>
				</div>
				<div className='controls'>
					<ThemeSwitcher setTheme={setTheme} />
					<DownloadButton videoUrl={currentVideoUrl} />
				</div>
				<div className='file-drop-zone' ref={dropZoneRef} onDrop={handleDrop} onDragOver={handleDragOver}>
					<p>Przeciągnij i upuść plik wideo tutaj lub</p>
					<input
						type='file'
						ref={fileInputRef}
						onChange={handleFileSelect}
						accept='video/*'
						style={{ display: 'none' }}
					/>
					<button onClick={() => fileInputRef.current.click()}>Wybierz plik</button>
				</div>
			</div>
		)
}

export default App
