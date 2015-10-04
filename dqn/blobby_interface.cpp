

#include "blobby_interface.hpp"
#include <functional>
#include <thread>
#include <sio_client.cpp>
#include <sio_socket.cpp>
#include <internal/sio_client_impl.cpp>
#include <internal/sio_packet.cpp>
#include <sio_message.h>
#include <string>

BlobbyInterface::BlobbyInterface() {

}
BlobbyInterface::~BlobbyInterface() {}

reward_t BlobbyInterface::act(Action action) {
    h.socket()->emit("act", action_to_string(action));
    return 0;
}

bool BlobbyInterface::game_over() {
    return true;
}

void BlobbyInterface::reset_game() {}
void BlobbyInterface::connect() {
    std::cout << "asdfdd";
    h.connect("http://127.0.0.1:3000");
    //h.socket()->emit("act", "LEFT");
}

ActionVect BlobbyInterface::getLegalActionSet() {
    return ActionVect {
        PLAYER_NOOP,
        PLAYER_LEFT,
        PLAYER_RIGHT,
        PLAYER_UP,
        PLAYER_RESET
    };
}

int BlobbyInterface::getFrameNumber() {}

int BlobbyInterface::getEpisodeFrameNumber() {}

void BlobbyInterface::receiveMsg(sio::event ev) {
    string str = ev.get_message()->get_string();
    LOG(string);

}

const BlobbyScreen& BlobbyInterface::getScreen() {
    string t = "adsf";
    std::cout << "send";
    LOG("send")
    h.socket()->emit("frame", t);

    string str = "";
    h.socket()->on("frame", sio::socket::event_listener_aux(
            [&](string const& name, sio::message::ptr const& data, bool isAck,sio::message::list &ack_resp){
               str = data->get_string();
                LOG(str)
            }));


    while(vector.size()==0) sleep(1);
    return BlobbyScreen(5,5);
}
