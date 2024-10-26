<h1>monkey-typewriter</h1>
<p>js implementation of the age old monkey on a typewriter hypothetical</p>
<p>currently there are 3 models</p>
<ul>
  <li><b>dumb typewriter</b></li>
  <p>generates a random character, iterates through input_str, if that character == input_str[i] it sets output_str[i] to random_char, if random_char != input_str[i] it starts from scratch</p>
  <p>using this model is generally a bad idea, refer to the calculation in the bottom of the page for why</p>
  <li><b>regular typewriter</b></li>
  <p>same as dumb typewriter but it regenerates new_char until it gets it right, no starting from scratch</p>
  <li><b>highbrow typewriter</b></li>
  <p>picks a random character and interates through all characters of input_str, if it finds a match to input_str[i] it sets output_str[i] to random_char and then picks a new character, if no match is found it picks a new random character</p>
</ul>
<p>licensed under the GNU General Public License v2.0 so feel free to fix, break, fork, modify, maim, destroy as you see fit</p>

<h2>TODO</h2>
<ul>
  <li>option to choose what random characters to generate</li>
  <li>funny confetti on finish</li>
  <li>illusive 4th model</li>
  <li>website touchups?</li>
  <li>calculation for banana wages(apparently unpaid labour is bad, who knew)</li>
</ul>

<p>running out of things to put here so</p>
<img src="important shit that the website would not function without/boogie.gif" height="256"></img>
