cmake_minimum_required (VERSION 2.6)
project(dqn)

option(CPU_ONLY "Use CPU only for Caffe" ON)
option(USE_CUDNN "Use cuDNN for Caffe" OFF)

set(CAFFE ~/caffe2/)
set(SOCKETIO ~/socketio_cpp/)

include_directories(${SOCKETIO}build/include)
include_directories(${SOCKETIO}build)
include_directories(${SOCKETIO}src)
include_directories(${SOCKETIO}src/include)
include_directories(${SOCKETIO}lib/rapidjson/include)
include_directories(${SOCKETIO}lib/websocketpp)
include_directories(${CAFFE}include)
include_directories(${CAFFE}build/src)
include_directories(/usr/include/hdf5/serial/) # fix for hdf5 in ubuntu
link_directories(${SOCKETIO}build/lib)
link_directories(${CAFFE}build/lib)

if(USE_CUDNN)
  link_directories(~/cudnn-6.5-linux-R1)
endif()

add_executable(dqn dqn_main.cpp dqn.cpp)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -O3 -march=native")

target_link_libraries(dqn caffe)
target_link_libraries(dqn glog)
target_link_libraries(dqn gflags)
target_link_libraries(dqn pthread)
target_link_libraries(dqn boost_system)

if(APPLE)
  include_directories(/System/Library/Frameworks/vecLib.framework/Versions/Current/Headers)
endif()

if(USE_SDL)
  add_definitions(-D__USE_SDL)
  if(APPLE)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -framework Cocoa")
    target_link_libraries(dqn sdl)
    target_link_libraries(dqn sdl_gfx)
    target_link_libraries(dqn sdl_image)
    target_link_libraries(dqn sdlmain)
  else()
    target_link_libraries(dqn SDL)
    target_link_libraries(dqn SDL_gfx)
    target_link_libraries(dqn SDL_image)
    target_link_libraries(dqn SDLmain)
  endif()
endif()

if(NOT CPU_ONLY)
  include_directories(/usr/local/cuda-6.5/targets/x86_64-linux/include)
endif()

if(CPU_ONLY)
  add_definitions(-DCPU_ONLY)
endif()

if(USE_CUDNN)
  target_link_libraries(dqn cudnn)
endif()

