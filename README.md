# deep-blobby
---

deep-blobby is [Blobby Volley](http://blobby.sourceforge.net/ "Blobby Volley Website") and Machine Learning.

deep-blobby makes Blobby Volley easy-to-use for quick Machine Learning applications with your favorite framework and environment.

The code base was hacked during hackZurich 2015 by Boyan Beronov, Johannes Plapp, and Maximilian Soelch.

## Architecture

The architecture is depicte below:

![Architecture](https://github.com/msoelch/deep-blobby/blob/readme/Architecture.PNG)

Blobby Volley 2 Web is capsuled in [node.js](https://nodejs.org/en/). 

A [socket.io](http://socket.io)-based game interface receives action messages (corresponding to keystrokes in the original game) and passes them on to the game engine. An output engine provides Data-URL that can be used with, e.g., any modern browser to display the game in realtime. 

The game engine is thus platform-independent on both ends and can easily be used out of the box.

1. We provide an easy-to-use, platform-independent  to the web version of Blobby Volley 2. It takes user interactions (key strokes) as input and outputs score and raw image data from Blobby Volley. The events can be displayed in a modern browser in real-time using a second socket. It is straightforward to apply any intelligent agent or UI in any platform supporting socket.io.
2. Starting from [muupan's implementation](https://github.com/muupan/dqn-in-the-caffe) of Deep Reinforcment Learning/Q-Learning (DQN, cf. [1, 2]) in the [Caffe package](http://caffe.berkeleyvision.org/), we create a self-teaching agent playing and learning Blobby Volley. It could easily be exchanged with any intelligent agent.
 

[1] 
>Mnih, V., Kavukcuoglu, K., Silver, D., Rusu, A. A., Veness, J., Bellemare, M. G., ... & Hassabis, D. (2015). Human-level control through deep reinforcement learning. Nature, 518(7540), 529-533.
URL: http://www.nature.com/nature/journal/v518/n7540/abs/nature14236.html

[2]
>Mnih, V., Kavukcuoglu, K., Silver, D., Graves, A., Antonoglou, I., Wierstra, D., & Riedmiller, M. (2013). Playing atari with deep reinforcement learning. arXiv preprint arXiv:1312.5602. URL: http://arxiv.org/abs/1312.5602