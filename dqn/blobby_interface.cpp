

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
    return false;
}

void BlobbyInterface::reset_game() {}
void BlobbyInterface::connect() {
    std::cout << "asdfdd";
    h.connect("http://127.0.0.1:3001");
    sleep(1);
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

}

const BlobbyScreen& BlobbyInterface::getScreen() {
    string t = "adsf";
    std::cout << "send";
    h.socket()->emit("frame", t);

    h.socket()->on("frame", sio::socket::event_listener([&](sio::event& e){
                std::vector<int> pic;
                sio::message::list ms = e.get_messages();
                for (size_t i = 0; i < ms.size(); ++i)
                    std::cout << ms[i];
            }));

sleep(5);
    return BlobbyScreen(5,5);
}
