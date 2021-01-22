# make-it-name

Make-it-name is a random name generator that can be used via CLI or as a npm package. Make-it-name was designed to be a light-weight utility used from a Powershell terminal; feel free to adapt and use as you see fit.

Make-it-name outputs a randomly generated name from three wordlists: adjectives, scientist names, and author names. By default, these names are separated by '-' for readability and usage.

_Example output:_

```
quirky-asimov
```

### Problem

Sometimes, one of the hardest things to do is to start. In my experience, coming up with a name for anything can get in the way of progress, whether that is a function name, test method name, article title, etc. Getting caught up in naming something can easily keep you from putting one foot in front of the other. Names are extremely important and should require a lot of thought, however it is usually easier to describe what something is doing after it exists rather than before. Make-it-name was built as a fun way to help stub out names and for me to learn a little about NodeJS CLIs.

### Inspiration

If you use Docker, you'll notice that if an image name is not provided, Docker will create a name for your image composed of an adjective and the last name of famous scientist. Similarly, make-it-name uses adjectives and scientist names to create a name, but also adds last name of a famous author as a possible alternative.

## Installation

### Install from npm:

If you plan to use as is, run:

```
npm i -g make-it-name //or npm install -g make-it-name
```

### Local installation:

If you wish to clone the repository and then install globally, navigate to the repository's context in your terminal and run:

```
npm i -g //or npm install -g
```

### Check global installation:

To check your global installation, run:

```
npm ls -g -depth=0
```

### Uninstall

To uninstall, run:

```
npm uninstall -g make-it-name
```

## Usage

Once the make-it-name package has been installed globally the `mknm` command should be accessible via Powershell, Cmd, or NodeJS terminal.

Example:

```
PS C:\> mknm
historical-watson
```

Make-it-name supports command line arguments to output with underscores instead of hyphens.

Example:

```
PS C:\> mknm -u
tart_dickinson
```

Make-it-name also supports command line arguments to output with capitalization. This option can be used along with the underscore option.

Example:

```
PS C:\> mknm -u -c
Abusive_Vesalius
```

### Advanced Usage

To make the output of make-it-name a little more usable, you can use a Powershell function and alias to set the output in your clipboard value.

Modify your current Powershell profile to store a new alias.

Open your profile with VS Code:

```
code $profile //or notepad $profile
```

Add the following function and alias with your replacement for _[name]_:

```
Function Generate-Name { Set-Clipboard -Value (. mknm) }
Set-Alias -Name [name] -Value Generate-Name
```

Whatever value you provided for the alias name can be called via Powershell to copy a random name to your clipboard.
