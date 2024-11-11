// export const Topbar = () => {
//     return <div className="max-w-screen-lg w-full bg-black align-center px-5 pb-5 pt-8">
//         <img src="/grape_code_logo.jpeg" className="max-w-32" />
//         <div className="text-8xl text-white">
//             Daily Code
//         </div>
//         {/* <NavBar /> */}
//     </div>
// }
export const Topbar = () => {
    return (
        <div className="place-items-center grid">
            <div className="max-w-screen-lg w-full bg-black min-h-32 align-center px-5 flex flex-col items-start">
                {/* <img src="/grape_code_logo.jpeg" className="max-w-32" /> */}
                <div className="text-8xl text-white">Grape_Code</div>
                <NavBar />
            </div>
        </div>
    );
}
const topbarItems=[
    {
        title:"About",
        route:"/about"
    },{
        title:"Activity",
        route:"/activity"
    },
    {
        title:"Problems",
        route:"/problems"
    },
    {
        title: "Leaderboard",
        route:"/leaderboard"
    }
]
function NavBar(){
    return <div className="flex mt-4">
        {topbarItems.map(item=><NavBarItem route={item.route} title={item.title}/>)}
    </div>
}
function NavBarItem({title,route}:{
    title:string;
    route: string;
}){

    return <div className="mx-10 text-slate-500 text-lg cursor-pointer hover:text-white text-base">
    {title}
</div>
}