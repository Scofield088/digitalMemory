import {Button} from "./components/Button"
import { Card } from "./components/Card"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
function App() {


  return <div className="p-4">
    <div className="flex justify-end gap-4">
    <Button variant="primary" text="Add content" startIcon={<PlusIcon/>}></Button>
    <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}></Button>
    </div>
    <div className="flex gap-4">
    <Card type="twitter" link="https://x.com/kirat_tw/status/1929805164963061811" title="First tweet"/>
    <Card type="youtube" link="https://www.youtube.com/watch?v=UAhi9TlpDYQ" title="First tweet"/>
    </div>
    </div>
}

export default App
