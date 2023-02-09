# howardhuangxyz.github.io

https://domains.google.com/registrar/search?authuser=2&searchTerm=howardhuang.xyz&tab=0&sort=3


## plan

### Home

Text scrolls in from left and right


background starts as a cube, but starts breaking into a 3x3x3 which slowly moves outwards on straight trajectories


Camera breakpoints

Initial 
    camera.position.set( -4.8, 7.5, 6.4);
    camera.lookAt(0, 2, 0);

ease towards

Left position
    camera.position.set(-8.9, 7.5, 7.1);
    camera.lookAt(1.2, 2, 3.8);

ease towards

Right position
    camera.position.set(-5.1, 7.5, 6.0);
    camera.lookAt(-2.8, 2, -0.9);

ease towards final position

Final = Initial
    camera.position.set( -4.8, 7.5, 6.4);
    camera.lookAt(0, 2, 0);


When Left, break apart in positive Z

When right, break apart in negative X

27 total, break off 19 - 10 in first, 9 in second??

leave 8

for final animation
//todo

expand boxes 