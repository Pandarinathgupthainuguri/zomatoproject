import React from 'react'
import QuickSearch from './QuickSearch'
import Wallpaper from './Wallpaper'
import '../Style/Home.css'

export default function Home() {
  return (
    <div>
        <Wallpaper/>
        <QuickSearch/>
    </div>
  )
}
