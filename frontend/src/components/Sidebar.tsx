import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import {Twitter} from "../icons/Twitter"
import { Logo } from "../icons/Logo";
export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <h1 className="flex text-2x pt-8 justify-items-center">
            <div className="pr-2 text-purple-600">
            <Logo/>
            </div>
            Digital Memory
        </h1>
        <div className="pt-8 pl-4">
            <SideBarItem text="Twitter" icon={<Twitter/>}/>
            <SideBarItem text="Youtube" icon={<YoutubeIcon/>}/>
        </div>
    </div>
}