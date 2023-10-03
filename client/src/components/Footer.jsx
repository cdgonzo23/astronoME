

function Footer() {
  return (
    <div className="m-8 p-4 bg-darkest text-gray-500 grid grid-cols-12 font-heading justify-items-center">
      <div className="col-span-6 md:justify-self-start md:col-span-4 flex flex-col m-2">
        <p className="text-gray-400">Contributors</p>
        <a className="font-body hover:text-hover-blue" href='https://github.com/ChesneyJulian'>Chesney Julian</a>
        <a className="font-body hover:text-hover-blue" href='https://github.com/cdgonzo23'>Christian Gonzales</a>
        <a className="font-body hover:text-hover-blue" href='https://github.com/dong135790'>Justin Dong</a>
        <a className="font-body hover:text-hover-blue" href='https://github.com/t-willis'>Taylor Willis</a>
        <a className="font-body hover:text-hover-blue" href='https://github.com/Zgibbs58'>Zach Gibbs</a>
      </div>
      <div className="col-span-6 md:col-span-4 flex flex-col m-2">
        <p className="text-gray-400">Resources</p>
        <a className="font-body hover:text-hover-blue" href='https://api.nasa.gov/'>NASA</a>
        <a className="font-body hover:text-hover-blue" href='https://openweathermap.org/api'>Open Weather Map</a>
        <a className="font-body hover:text-hover-blue" href='https://cloudinary.com/ip/gr-sea-gg-brand-home-base?utm_source=google&utm_medium=search&utm_campaign=goog_selfserve_brand_wk22_replicate_core_branded_keyword&utm_term=1329&campaignid=18164753405&adgroupid=144188713167&keyword=cloudinary&device=c&matchtype=e&adposition=&gad=1&gclid=Cj0KCQjw1OmoBhDXARIsAAAYGSGL3dnpXyhJ9cZADRrUAwD6ejLmi6pCWMufn3d4PSOLvO9WsD7LsZcaAhCpEALw_wcB'>Cloudinary</a>
      </div>
      <p className="col-span-12 md:col-span-4 m-4 md:justify-self-end text-gray-400">© 2023 AstronoMe</p>
      
      
      
    </div>
  )
}

export default Footer