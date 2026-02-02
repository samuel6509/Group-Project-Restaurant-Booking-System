import Menu from './menu';

// imports the menu & gets correct data from it via sending props
const MorningMenu = () => 
{
    return (
        <Menu
            menuType="morning_menu"
            menuTitle="Morning Menu"
            menuDescription="This menu is served from opening up until 5pm."
        />
    )
}
export default MorningMenu;