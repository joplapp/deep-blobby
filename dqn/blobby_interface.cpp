#include "blobby_interface.hpp"


std::string action_to_string(Action a) {
    static std::string tmp_action_to_string[] = {
            "NOOP"
            ,"LEFT"
            ,"RIGHT"
            ,"UP"
            ,"RESET"
            ,"RANDOM"
    };
    assert (a >= 0 && a <= 6);
    return tmp_action_to_string[a];
}



BlobbyInterface::~BlobbyInterface() {}

BlobbyInterface::BlobbyInterface(){

};
void BlobbyInterface::connect(){

};
void BlobbyInterface::getMinimalActionSet(){

};
