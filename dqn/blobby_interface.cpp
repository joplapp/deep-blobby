
#include "blobby_interface.hpp"


BlobbyInterface::BlobbyInterface() {}
BlobbyInterface::~BlobbyInterface() {}

reward_t BlobbyInterface::act(Action action) {
    return 0;
}

bool BlobbyInterface::game_over() {
    return true;
}

void BlobbyInterface::reset_game() {}
void BlobbyInterface::connect() {}

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

const BlobbyScreen& BlobbyInterface::getScreen() {}
