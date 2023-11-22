/* eslint-disable react/prop-types */
const HamburgerIcon = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className='hamburgerIconContainer'>
      <label className='labelHamburgerIcon' htmlFor="hamburgerIcon">
        <input className='hamburgerIcon' type="checkbox" name="hamburgerIcon" checked={isSidebarOpen} id="hamburgerIcon" onClick={() => toggleSidebar()}/> 
        <span></span>
        <span></span>
        <span></span>
    </label>
    </div>
  )
}

export default HamburgerIcon;