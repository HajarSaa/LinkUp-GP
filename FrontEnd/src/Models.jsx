import ChannelDetails from './components/Chat/channel/channelDetails/ChannelDetails'
import CreateChannelModal from './components/Chat/channel/createChannelModel/CreateChannelModal'
import AddPeopleModal from './components/Chat/channel/addPeopleModal/AddPeopleModal'
import NotificationsModal from './components/Chat/channel/header/channelMenu/notifiactionModel/NotificationsModel'

function Models() {
    return (
        <>
            <ChannelDetails />
            <CreateChannelModal />
            <AddPeopleModal />
            <NotificationsModal />
        </>
    )
}

export default Models