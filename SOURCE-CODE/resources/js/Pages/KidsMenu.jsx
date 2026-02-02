import Menu from './menu';

// prop for the menu page to load the correct menu
const KidsMenu = () => 
{
    return (
        <Menu
            menuType="kids_menu"
            menuTitle="Kids Menu"
            menuDescription="A special menu for kids under 12 years old."
        />
    )
}
export default KidsMenu;