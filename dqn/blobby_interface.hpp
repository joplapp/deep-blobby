
#ifndef __BLOBBY_INTERFACE_HPP__
#define __BLOBBY_INTERFACE_HPP__

#include <string>
#include <memory>

static const std::string Version = "0.1";

/**
   This class interfaces ALE with external code for controlling agents.
 */
class ALEInterface {
public:
  ALEInterface();
  ~ALEInterface();

  // Applies an action to the game and returns the reward. It is the
  // user's responsibility to check if the game has ended and reset
  // when necessary - this method will keep pressing buttons on the
  // game over screen.
  reward_t act(Action action);

  // Indicates if the game has ended.
  bool game_over();

  // Resets the game, but not the full system.
  void reset_game();

  // Returns the vector of legal actions. This should be called only
  // after the rom is loaded.
  ActionVect getLegalActionSet();

  // Returns the vector of the minimal set of actions needed to play
  // the game.
  ActionVect getMinimalActionSet();

  // Returns the frame number since the loading of the ROM
  int getFrameNumber();

  // Returns the frame number since the start of the current episode
  int getEpisodeFrameNumber();

  // Returns the current game screen
  const BlobbyScreen &getScreen();

 public:
  std::auto_ptr<OSystem> theOSystem;
  std::auto_ptr<Settings> theSettings;
  std::auto_ptr<RomSettings> romSettings;
  std::auto_ptr<StellaEnvironment> environment;
  int max_num_frames; // Maximum number of frames for each episode

};


/** A simple wrapper around an Atari screen. */
class BlobbyScreen {
  public:
    ALEScreen(int h, int w);
    ALEScreen(const ALEScreen &rhs);

    ALEScreen& operator=(const ALEScreen &rhs);

    /** pixel accessors, (row, column)-ordered */
    pixel_t get(int r, int c) const;
    pixel_t *pixel(int r, int c);

    /** Access a whole row */
    pixel_t *getRow(int r) const;

    /** Access the whole array */
    pixel_t *getArray() const { return const_cast<pixel_t *>(&m_pixels[0]); }

    /** Dimensionality information */
    size_t height() const { return m_rows; }
    size_t width() const { return m_columns; }

    /** Returns the size of the underlying array */
    size_t arraySize() const { return m_rows * m_columns * sizeof(pixel_t); }

    /** Returns whether two screens are equal */
    bool equals(const ALEScreen &rhs) const;

  protected:
    int m_rows;
    int m_columns;

    std::vector<pixel_t> m_pixels;
};

inline ALEScreen::ALEScreen(int h, int w):
  m_rows(h),
  m_columns(w),
  // Create a pixel array of the requisite size
  m_pixels(m_rows * m_columns) {
}

inline ALEScreen::ALEScreen(const ALEScreen &rhs):
  m_rows(rhs.m_rows),
  m_columns(rhs.m_columns),
  m_pixels(rhs.m_pixels) {

}

inline ALEScreen& ALEScreen::operator=(const ALEScreen &rhs) {

  m_rows = rhs.m_rows;
  m_columns = rhs.m_columns;

  // We rely here on the std::vector constructor doing something sensible (i.e. not wasteful)
  // inside its assignment operator
  m_pixels = rhs.m_pixels;

  return *this;
}

inline bool ALEScreen::equals(const ALEScreen &rhs) const {
  return (m_rows == rhs.m_rows &&
          m_columns == rhs.m_columns &&
          (memcmp(&m_pixels[0], &rhs.m_pixels[0], arraySize()) == 0) );
}

// pixel accessors, (row, column)-ordered
inline pixel_t ALEScreen::get(int r, int c) const {
  // Perform some bounds-checking
  assert (r >= 0 && r < m_rows && c >= 0 && c < m_columns);
  return m_pixels[r * m_columns + c];
}

inline pixel_t* ALEScreen::pixel(int r, int c) {
  // Perform some bounds-checking
  assert (r >= 0 && r < m_rows && c >= 0 && c < m_columns);
  return &m_pixels[r * m_columns + c];
}

// Access a whole row
inline pixel_t* ALEScreen::getRow(int r) const {
  assert (r >= 0 && r < m_rows);
  return const_cast<pixel_t*>(&m_pixels[r * m_columns]);
}

#endif
