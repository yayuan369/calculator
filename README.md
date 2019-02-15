# calculator
这是一个简单的计算器

### 演示
<image src="https://github.com/yayuan369/calculator/blob/master/eg.gif" width="400px" height="650px" />

#### 部分解说
对于连续输入式子采取用两个数组,一个数组用来存储数字,另一个数组用来存储符号,然后先计算乘除,再计算加减,我的处理方式是先调用计算乘除的函数,然后保留剩余的数字和符号,然后再调用计算加减的函数.
