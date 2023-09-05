// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
interface IERC20 {
    // name, symbol, decimals не часть стандарта(хи просто желательно добавлять)
    function name() external view returns(string memory);

    function symbol() external view returns(string memory);

    function decimals() external pure returns(uint);

    // показывает сколько токенов есть в обороте
    function totalSupply() external view returns(uint);

    // функция показывает сколько токенов есть по определенному адресу
    function balanceOf(address account) external view returns(uint);

    // функция будет пересылать токены в определенном количестве и на определенный адрес
    // (инициатор тразы отправляет свои деньги куда-то)
    function transfer(address to, uint amount) external;

    // функия нужна для того чтобы мы(владельцы) позволили другому адресу забрать токен(ы) к примеру в полльзу третьего лица
    function allowance(address _owner, address spender) external view returns(uint);

    // функция в котороя я говорю кто может списывать токены и в каком количестве
    function approve(address spender, uint amount) external;

    // функция которая непосредственно переводит токены с одного счета на другой в определенном количестве
    function transferFrom(address sender, address recipient, uint amount) external;

    event Transfer(address indexed from, address indexed to, uint amount);

    event Approve(address indexed owner, address indexed to, uint amount);
}