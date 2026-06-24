---
title: 从算符增长到 Krylov Complexity：一份初学者 Lecture Note
tags:
  - Minimal-M
  - Krylov-Complexity
  - Tutorial
date: 2026-06-24
---
## 0. 这份笔记想回答什么问题？

量子多体系统里，一个很简单的局域算符，比如某个格点上的自旋算符 $Z_i$，在 Heisenberg 图像下会随时间演化：

$$  
O(t)=e^{iHt}Oe^{-iHt}.  
$$

虽然一开始 $O$ 可能只作用在一个格点上，但经过相互作用 Hamiltonian 的演化后，它会逐渐变成一个越来越复杂的多体算符。例如，它可能从单个 Pauli 算符变成许多 Pauli string 的叠加。

这就是所谓的**算符增长**。

直观地说：

- 可积或自由系统中，算符增长通常比较有规律、受限制；
    
- 混沌系统中，算符会迅速扩散到越来越复杂的方向；
    
- Krylov complexity 的目标，是把这种“算符变复杂”的过程变成一个可计算、可比较的量。
    

Parker 等人的文章提出了一个重要观点：

> 在一般非可积量子多体系统中，算符增长具有某种普适性，这种普适性可以通过 Lanczos 系数的线性增长来描述。

这就是 **Universal Operator Growth Hypothesis**。

---

## 1. 从 Heisenberg 演化开始

在 Schrödinger 图像中，我们通常研究态的演化：

$$  
|\psi(t)\rangle=e^{-iHt}|\psi(0)\rangle.  
$$

但在研究算符增长时，更自然的是 Heisenberg 图像：

$$  
O(t)=e^{iHt}O(0)e^{-iHt}.  
$$

对时间求导得到：

$$  
\frac{dO(t)}{dt}=i[H,O(t)].  
$$

定义 Liouvillian 超算符：

$$  
\mathcal{L}O=[H,O].  
$$

于是算符演化可以写成：

$$  
O(t)=e^{i\mathcal{L}t}O(0).  
$$

这里要注意：$\mathcal{L}$ 不是普通 Hilbert 空间中的 Hamiltonian，而是作用在“算符空间”上的生成元。也就是说，我们把算符 $O$ 本身当作一个向量来看。

---

## 2. 算符也可以组成一个 Hilbert 空间

为了讨论“算符空间”，我们需要定义算符之间的内积。最常见的是无限温度内积：

$$  
(A|B)=\frac{1}{\text{Tr}(\mathbf{1})}\text{Tr}(A^\dagger B).  
$$

在这个内积下，两个算符如果满足

$$  
(A|B)=0,  
$$

就可以看作是彼此正交的“方向”。

所以我们可以把一个算符写成抽象向量：

$$  
|O).  
$$

这样一来，算符演化就变成了算符 Hilbert 空间中的运动：

$$  
|O(t))=e^{i\mathcal{L}t}|O).  
$$

这一步非常重要。Krylov complexity 的核心思想就是：

> 看一个初始算符在算符空间里随时间跑到了多远、多复杂的方向。

---

## 3. Krylov 空间是什么？

给定一个初始算符 $|O_0)$，我们可以不断让 Liouvillian 作用在它上面：

$$  
|O_0),\quad \mathcal{L}|O_0),\quad \mathcal{L}^2|O_0),\quad \mathcal{L}^3|O_0),\ldots  
$$

这些向量张成的空间叫做 Krylov 空间：

$$  
\mathcal{K}=\text{span}{|O_0),\mathcal{L}|O_0),\mathcal{L}^2|O_0),\ldots}.  
$$

直观上，Krylov 空间包含了初始算符在动力学下能够探索到的所有方向。

如果 Krylov 空间维度很小，说明算符演化受到很强限制。  
如果 Krylov 空间维度很大，说明算符可以探索很多复杂方向。

但仅仅知道 Krylov 空间大不大还不够。我们还想知道：

> 算符随时间是慢慢扩散进去，还是快速冲向复杂方向？

这就需要 Lanczos 算法。

---

## 4. Lanczos 算法：把复杂问题变成一条链

Lanczos 算法的作用，是从初始算符 $|O_0)$ 出发，构造一组正交归一的 Krylov 基：

$$  
|O_0), |O_1), |O_2), |O_3),\ldots  
$$

在这组基底中，Liouvillian 的作用具有特别简单的形式：

$$  
\mathcal{L}|O_n)=b_{n+1}|O_{n+1})+b_n|O_{n-1}).  
$$

这里的 $b_n$ 叫做 **Lanczos 系数**。

这条公式的物理图像非常漂亮：原来复杂的算符增长问题，被映射成了一个粒子在一维半无限链上的跳跃问题。

这条链可以画成：

$$  
0 \leftrightarrow 1 \leftrightarrow 2 \leftrightarrow 3 \leftrightarrow \cdots  
$$

第 $n$ 个格点对应第 $n$ 个 Krylov 基矢 $|O_n)$。  
从 $n$ 跳到 $n+1$ 的强度就是 $b_{n+1}$。

所以，$b_n$ 决定了算符在 Krylov 链上向复杂方向传播的速度。

---

## 5. Krylov complexity 的定义

把时间演化后的算符展开在 Krylov 基底上：

$$  
|O(t))=\sum_{n=0}^{\infty}\phi_n(t)|O_n).  
$$

其中 $|\phi_n(t)|^2$ 可以理解为算符位于 Krylov 链第 $n$ 个位置的权重。

于是 Krylov complexity 定义为：

$$  
K(t)=\sum_{n=0}^{\infty}n|\phi_n(t)|^2.  
$$

这就是 Krylov 链上的平均位置。

如果 $K(t)$ 很小，说明算符主要停留在低阶 Krylov 基矢上，也就是仍然比较简单。  
如果 $K(t)$ 很大，说明算符已经扩散到高阶 Krylov 基矢上，也就是变得复杂。

因此，Krylov complexity 可以被理解为：

> 一个初始简单算符在动力学作用下，平均跑到了 Krylov 链上多远。

---

## 6. 为什么 Lanczos 系数比 $K(t)$ 更根本？

虽然 $K(t)$ 是我们最终想看的复杂度，但真正决定动力学的是 Lanczos 系数 $b_n$。

原因是：在 Krylov 基底中，整个演化问题由下面这条链决定：

$$  
\mathcal{L}|O_n)=b_{n+1}|O_{n+1})+b_n|O_{n-1}).  
$$

如果 $b_n$ 增长很慢，算符向高 $n$ 传播就慢。  
如果 $b_n$ 增长很快，算符就会迅速跑向 Krylov 链深处。

所以 Parker 等人的思路是：

> 与其直接研究复杂的 $O(t)$，不如研究 $b_n$ 的渐近行为。

---

## 7. Universal Operator Growth Hypothesis

文章的核心假说可以用一句话概括：

> 在一般非可积量子多体系统中，Lanczos 系数 $b_n$ 会以尽可能快的方式增长；在很多情况下，这种增长近似为线性增长。

数学上写作：

$$  
b_n\sim \alpha n.  
$$

这里 $\alpha$ 是一个增长率。它可以看作系统本身的动力学特征，类似于一种“算符增长速度”。

这个假说的重要性在于：如果 $b_n$ 线性增长，那么 Krylov 链上的传播会变得非常快，并导致 Krylov complexity 指数增长：

$$  
K(t)\sim e^{2\alpha t}.  
$$

更精确地说，对于理想化的线性 Lanczos 系数模型，$K(t)$ 的增长形式类似：

$$  
K(t)\sim \sinh^2(\alpha t),  
$$

在较长但未饱和的时间区间中表现为指数增长。

这说明：

- $b_n$ 的线性增长是算符复杂度指数增长的原因；
    
- $\alpha$ 控制复杂度增长速度；
    
- 混沌系统倾向于拥有更快的 Krylov 增长。
    

---

## 8. 为什么这和量子混沌有关？

传统量子混沌中常用 OTOC：

$$  
C(t)=-\langle [W(t),V]^2\rangle.  
$$

如果系统是混沌的，$W(t)$ 会快速扩散，使它和远处或不同自由度上的 $V$ 不再对易。于是 OTOC 可能出现指数增长：

$$  
C(t)\sim e^{\lambda_L t}.  
$$

这里 $\lambda_L$ 被称为量子 Lyapunov 指数。

Krylov complexity 的观点是：

> OTOC 只是观察算符增长的一个投影，而 Krylov complexity 更像是直接研究算符在整个 Krylov 空间中的扩散。

因此，Krylov complexity 比 OTOC 更“全局”。  
OTOC 依赖你选什么 $W$、什么 $V$，而 Krylov complexity 从初始算符出发，系统地追踪它在整个算符空间中的增长。

Parker 等人的一个重要结论是：Krylov 增长率 $\alpha$ 可以限制一大类算符复杂度增长，特别是给 Lyapunov 指数一个上界：

$$  
\lambda_L\le 2\alpha.  
$$

这说明 Krylov complexity 不只是另一个复杂度定义，而是可以约束传统混沌诊断量。

---

## 9. 混沌系统、可积系统和自由系统的区别

这篇文章的一个核心物理图像是：

### 9.1 自由系统

自由系统中准粒子之间不发生真正复杂的相互作用。算符虽然会扩散，但结构通常比较简单。对应地，Lanczos 系数增长较慢，Krylov complexity 不会表现出强烈的指数增长。

### 9.2 可积系统

可积系统有大量守恒量。这些守恒量限制了算符能够探索的方向。Lanczos 系数可能增长，但往往不具有一般混沌系统中那种稳定、普适的线性增长。

### 9.3 混沌系统

混沌系统中，算符会不断生成新的、更复杂的多体成分。Lanczos 系数倾向于线性增长：

$$  
b_n\sim \alpha n.  
$$

这导致 Krylov complexity 指数增长：

$$  
K(t)\sim e^{2\alpha t}.  
$$

所以，Lanczos 系数提供了一种区分动力学类型的工具。

---

## 10. 一个简单类比：算符像波包一样向右跑

可以把 Krylov 链想象成一条复杂度坐标轴：

- 第 0 个位置：原始简单算符；
    
- 第 1 个位置：一次对易后产生的方向；
    
- 第 2 个位置：两次对易后产生的方向；
    
- 更大的 $n$：更复杂、更深层的算符结构。
    

时间演化时，算符像一个波包一样从 $n=0$ 出发，沿着链向右移动。

Lanczos 系数 $b_n$ 就像链上的跳跃强度。  
如果越往右跳跃越快，也就是 $b_n$ 随 $n$ 增大而增大，那么波包会加速向右传播。

当

$$  
b_n\sim \alpha n  
$$

时，波包不是匀速运动，而是近似指数式地远离原点。  
这就是 Krylov complexity 指数增长的直观来源。

---

## 11. 为什么说这是“普适”假说？

文章中的“普适”不是说所有系统都满足同一组 $b_n$，而是说：

> 对一般非可积多体系统，Lanczos 系数的渐近增长形式具有普遍规律。

也就是说，不同系统的细节会影响 $\alpha$ 的具体数值，但线性增长这一结构可能是普遍的。

这有点类似热化中的普适性。不同材料的微观 Hamiltonian 不一样，但很多非可积系统都会表现出热化。

类似地，不同混沌系统的 microscopic details 不一样，但它们的 operator growth 可能都体现为 Lanczos 系数的线性增长。

---

## 12. 和谱函数、矩的关系

Parker 等人的文章还把 Krylov 增长和谱函数联系起来。

定义算符自相关函数：

$$  
C(t)=(O(t)|O).  
$$

它的 Fourier transform 给出谱函数：

$$  
\Phi(\omega).  
$$

谱函数的高频尾部和 Lanczos 系数的大 $n$ 行为密切相关。粗略地说：

- 如果谱函数高频衰减很快，Lanczos 系数增长较慢；
    
- 如果谱函数高频尾部衰减较慢，Lanczos 系数可以增长得更快；
    
- 对局域 Hamiltonian，系统的局域性会限制谱函数高频尾部，也限制 $b_n$ 的最大增长速度。
    

这就是为什么文章把 operator growth、Lanczos 系数、谱函数和局域性联系在一起。

从计算角度看，这也很有用：有时我们可以通过自相关函数或谱函数间接推断 Lanczos 系数，从而研究复杂度增长。

---

## 13. 一维系统中的对数修正

在一般维度中，文章提出典型增长形式：

$$  
b_n\sim \alpha n.  
$$

但在一维局域系统中，由于空间结构限制更强，可能会出现对数修正。粗略地说，一维系统中算符增长受到几何限制，Lanczos 系数的增长可能比简单线性形式稍慢。

这说明：

> “线性增长”是核心物理图像，但具体维度、局域性和模型结构会影响渐近形式。

对初学者来说，不必一开始纠结这个技术细节。最重要的是先理解：

$$  
b_n \text{ 的增长速度 }  
\Rightarrow  
K(t) \text{ 的增长速度 }  
\Rightarrow  
\text{算符复杂度增长}.  
$$

---

## 14. 这篇文章真正教给我们的是什么？

Parker 等人的工作可以总结成三个层次。

### 14.1 第一层：形式上的重写

把算符演化问题改写成 Krylov 链上的单粒子传播问题。

原问题：

$$  
O(t)=e^{iHt}Oe^{-iHt}.  
$$

Krylov 图像：

$$  
|O(t))=\sum_n \phi_n(t)|O_n).  
$$

复杂度：

$$  
K(t)=\sum_n n|\phi_n(t)|^2.  
$$

### 14.2 第二层：动力学核心变量

Lanczos 系数 $b_n$ 决定 Krylov 链上的传播。

如果 $b_n$ 增长慢，复杂度增长慢。  
如果 $b_n$ 线性增长，复杂度指数增长。

### 14.3 第三层：物理假说

一般混沌多体系统中的算符增长是“最快允许”的。  
这种最快增长体现为：

$$  
b_n\sim \alpha n.  
$$

这就是 **Universal Operator Growth Hypothesis**。

---

## 15. 初学者应该怎么读原文？

如果直接读原文，可以按以下顺序：

### 第一步：先读引言

重点抓住文章的问题意识：

- 为什么要研究 operator growth？
    
- 为什么 OTOC 不够？
    
- 为什么 Krylov 方法自然？
    

### 第二步：读 Lanczos/Krylov 构造

这部分是全篇最重要的技术核心。要搞清楚：

- 算符空间；
    
- Liouvillian；
    
- Krylov basis；
    
- Lanczos coefficients；
    
- Krylov complexity。
    

### 第三步：读核心假说

重点理解：

$$  
b_n\sim \alpha n  
$$

为什么意味着：

$$  
K(t)\sim e^{2\alpha t}.  
$$

### 第四步：跳读模型例子

原文中会讨论一些具体模型。初学者不一定需要全部细读。你可以重点看非可积 spin chain 的例子，因为它最接近普通量子多体物理直觉。

### 第五步：暂时跳过过深的应用

例如扩散常数计算、某些 SYK 细节、复杂的谱函数分析，可以作为第二遍阅读内容。

---

## 16. 可能的课堂讲解结构

如果要把这篇文章讲成一次 30–45 分钟报告，可以这样安排：

### 16.1 Motivation：为什么研究算符增长？

介绍 Heisenberg 演化下局域算符变复杂的现象。  
说明这和量子混沌、信息扰乱、热化有关。

### 16.2 Operator Hilbert Space

把算符当作向量。  
定义内积。  
引入 Liouvillian。

### 16.3 Krylov Basis and Lanczos Coefficients

解释如何从初始算符生成 Krylov basis。  
说明 Lanczos 系数是 Krylov 链上的 hopping amplitude。

### 16.4 Krylov Complexity

定义：

$$  
K(t)=\sum_n n|\phi_n(t)|^2.  
$$

解释它是 Krylov 链上的平均位置。

### 16.5 Universal Operator Growth Hypothesis

核心公式：

$$  
b_n\sim \alpha n.  
$$

物理意义：混沌系统中算符以最快允许速度增长。

### 16.6 Consequence

由线性 $b_n$ 推出：

$$  
K(t)\sim e^{2\alpha t}.  
$$

并说明：

$$  
\lambda_L\le 2\alpha.  
$$

### 16.7 Summary

一句话总结：

> Krylov complexity 把量子混沌中的算符增长问题转化为 Krylov 链上的传播问题，而 Lanczos 系数的线性增长是混沌算符增长的核心标志。

---

## 17. 最后总结

Parker 等人的文章之所以重要，是因为它给出了一个非常清晰的框架：

1. 把算符演化看成算符空间中的运动；
    
2. 用 Lanczos 算法构造 Krylov 链；
    
3. 用 Krylov complexity 衡量算符跑到多复杂的位置；
    
4. 用 Lanczos 系数 $b_n$ 描述复杂度增长的动力学；
    
5. 提出混沌系统中 $b_n$ 线性增长的普适假说；
    
6. 将 Krylov complexity、OTOC、Lyapunov 指数和量子混沌联系起来。
    

对于初学者来说，最重要的不是掌握所有技术细节，而是记住这条逻辑链：

$$  
\text{Hamiltonian dynamics}  
\Rightarrow  
\text{operator growth}  
\Rightarrow  
\text{Krylov basis}  
\Rightarrow  
\text{Lanczos coefficients}  
\Rightarrow  
\text{Krylov complexity}  
\Rightarrow  
\text{quantum chaos}.  
$$

换句话说，Krylov complexity 提供了一种新的语言来描述：

> 简单算符如何在混沌动力学中变复杂。