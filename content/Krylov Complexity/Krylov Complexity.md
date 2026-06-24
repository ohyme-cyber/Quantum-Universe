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
\frac{dO(t)}{dt}
=
iHO(t)-iO(t)H.
$$

也就是

$$
\frac{dO(t)}{dt}
=
i[H,O(t)].
$$

定义 Liouvillian 超算符：

$$
\mathcal{L}O=[H,O].
$$

于是算符演化可以写成：

$$
\frac{dO(t)}{dt}
=
i\mathcal{L}O(t).
$$

这个微分方程的形式解是：

$$
O(t)=e^{i\mathcal{L}t}O(0).
$$

这里要注意：$\mathcal{L}$ 不是普通 Hilbert 空间中的 Hamiltonian，而是作用在“算符空间”上的生成元。也就是说，我们把算符 $O$ 本身当作一个向量来看。

---

## 2. $e^{i\mathcal L t}$ 是怎么作用于 $O$ 的？

这里的 $\mathcal L$ 是一个 **superoperator**，也就是“作用在算符上的算符”。

普通 Hamiltonian $H$ 作用在态上：

$$
H|\psi\rangle.
$$

而 Liouvillian $\mathcal L$ 作用在算符上：

$$
\mathcal L O=[H,O]=HO-OH.
$$

所以

$$
e^{i\mathcal L t}O
$$

的意思不是普通数乘，也不是矩阵 $e^{iLt}$ 左乘 $O$，而是用指数展开定义：

$$
e^{i\mathcal L t}O
=
\sum_{k=0}^{\infty}
\frac{(it)^k}{k!}
\mathcal L^k O.
$$

其中

$$
\mathcal L^0O=O,
$$

$$
\mathcal L^1O=[H,O],
$$

$$
\mathcal L^2O=[H,[H,O]],
$$

$$
\mathcal L^3O=[H,[H,[H,O]]],
$$

以此类推。

因此

$$
e^{i\mathcal L t}O
=
O
+
it[H,O]
+
\frac{(it)^2}{2!}[H,[H,O]]
+
\cdots.
$$

这正好等价于 Heisenberg 演化：

$$
O(t)=e^{iHt}Oe^{-iHt}.
$$

所以最重要的理解是：

> $e^{i\mathcal L t}$ 是作用在“算符空间”里的时间演化算符。  
> 它通过不断取对易子 $[H,\cdot]$ 来推动 $O$ 演化。

---

## 3. 算符也可以组成一个 Hilbert 空间

为了讨论“算符空间”，我们需要定义算符之间的内积。最常见的是无限温度内积：

$$
(A|B)=\frac{1}{D}\text{Tr}(A^\dagger B),
$$

其中 $D$ 是系统 Hilbert space 的维度。

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

## 4. Krylov 空间是什么？

给定一个初始算符 $|O_0)$，我们可以不断让 Liouvillian 作用在它上面：

$$
|O_0),\quad \mathcal{L}|O_0),\quad \mathcal{L}^2|O_0),\quad \mathcal{L}^3|O_0),\ldots
$$

这些向量张成的空间叫做 Krylov 空间：

$$
\mathcal{K}(O,\mathcal L)
=
\text{span}
\{
O,\mathcal LO,\mathcal L^2O,\mathcal L^3O,\ldots
\}.
$$

直观上，Krylov 空间包含了初始算符在动力学下能够探索到的所有方向。

如果 Krylov 空间维度很小，说明算符演化受到很强限制。  
如果 Krylov 空间维度很大，说明算符可以探索很多复杂方向。

---

## 5. Krylov space 的维度是多少？

Krylov space 的维度就是这些向量里**线性无关的个数**：

$$
O,\mathcal LO,\mathcal L^2O,\mathcal L^3O,\ldots
$$

如果到某一步出现

$$
\mathcal L^m O
=
c_0O+c_1\mathcal LO+\cdots+c_{m-1}\mathcal L^{m-1}O,
$$

那么后面的向量都不会产生新方向，Krylov space 就闭合了，维度至多是 $m$。

在有限维 Hilbert 空间里，如果系统 Hilbert space 维度是 $D$，那么算符空间维度是

$$
D^2.
$$

所以 Krylov space 的维度一定满足

$$
\dim\mathcal K\le D^2.
$$

但实际维度通常比 $D^2$ 小，因为它只包含从初始算符 $O$ 出发、通过 $\mathcal L$ 能够到达的方向。

---

## 6. 用能量本征基理解 Krylov 维度

设 Hamiltonian 的本征态满足

$$
H|m\rangle=E_m|m\rangle.
$$

算符 $O$ 的矩阵元为

$$
O_{mn}=\langle m|O|n\rangle.
$$

那么

$$
(\mathcal LO)_{mn}
=
\langle m|[H,O]|n\rangle.
$$

展开对易子：

$$
(\mathcal LO)_{mn}
=
\langle m|HO-OH|n\rangle.
$$

因为

$$
H|n\rangle=E_n|n\rangle,
$$

以及

$$
\langle m|H=E_m\langle m|,
$$

所以

$$
(\mathcal LO)_{mn}
=
(E_m-E_n)O_{mn}.
$$

继续作用 $k$ 次：

$$
(\mathcal L^kO)_{mn}
=
(E_m-E_n)^kO_{mn}.
$$

所以 Krylov space 的维度和这些能量差

$$
\omega_{mn}=E_m-E_n
$$

有关。

粗略地说：

> 初始算符 $O$ 连接了多少个不同的能量差方向，Krylov space 就有多少个独立方向。

更准确地说，Krylov 维度等于序列

$$
O,\mathcal LO,\mathcal L^2O,\ldots
$$

能够生成的线性独立方向数。

数值上最简单的方法就是做 Lanczos 迭代；当某一步新的残差范数变成 $0$，算法停止，Krylov space 的维度就确定了。

---

## 7. 为什么要构造 Krylov space？

动机非常直接，因为

$$
O(t)=e^{i\mathcal L t}O
=
\sum_{k=0}^{\infty}
\frac{(it)^k}{k!}\mathcal L^kO.
$$

也就是说，时间演化后的 $O(t)$ 永远只会落在

$$
\text{span}
\{
O,\mathcal LO,\mathcal L^2O,\ldots
\}
$$

里面。

所以 Krylov space 不是人为乱造的空间，而是：

> 包含初始算符 $O$ 的所有时间演化 $O(t)$ 的最小 $\mathcal L$-不变空间。

这里的“最小”很重要。完整算符空间可能很大，比如 $D^2$ 维；但如果你只关心某个初始算符 $O$ 的演化，你不需要整个算符空间，只需要它实际能探索到的 Krylov space。

因此，Krylov space 的构造动机是：

1. 它是由动力学自然生成的；
2. 它是描述 $O(t)$ 所需的最小空间；
3. 它把复杂的算符增长问题转化成一个线性代数问题；
4. 它允许我们用 Lanczos 系数刻画算符增长速度。

---

## 8. 它和普通 Krylov 算法模拟 Hamiltonian 演化有什么关系？

关系非常密切，数学结构几乎一样。

普通 Krylov 方法模拟态演化：

$$
|\psi(t)\rangle=e^{-iHt}|\psi_0\rangle.
$$

它构造

$$
\mathcal K_m(H,|\psi_0\rangle)
=
\text{span}
\{
|\psi_0\rangle,H|\psi_0\rangle,H^2|\psi_0\rangle,\ldots,H^{m-1}|\psi_0\rangle
\}.
$$

然后在这个小空间里近似计算

$$
e^{-iHt}|\psi_0\rangle.
$$

而 Krylov complexity 这里做的是算符版本：

$$
O(t)=e^{i\mathcal L t}O.
$$

构造

$$
\mathcal K_m(\mathcal L,O)
=
\text{span}
\{
O,\mathcal LO,\mathcal L^2O,\ldots,\mathcal L^{m-1}O
\}.
$$

也就是说：

| 普通 Krylov 时间演化 | Krylov complexity |
|---|---|
| 向量是态 $|\psi\rangle$ | 向量是算符 $O$ |
| 演化生成元是 $H$ | 演化生成元是 $\mathcal L=[H,\cdot]$ |
| 空间是 Hilbert space | 空间是 operator Hilbert space |
| 目的是数值近似 $e^{-iHt}|\psi\rangle$ | 目的是理解算符增长和复杂度 |
| Lanczos 三对角化 $H$ | Lanczos 三对角化 $\mathcal L$ |

所以它们的数学核心是一样的：

> 用 $\{v,Av,A^2v,\ldots\}$ 生成一个最小有效子空间，在里面研究 $e^{At}v$。

区别只是：

- 普通 Krylov 方法主要是数值算法；
- Krylov complexity 把这个算法结构解释成“复杂度坐标”。

---

## 9. Krylov 基是怎么定义的？

Krylov space 原本由

$$
O,\mathcal LO,\mathcal L^2O,\ldots
$$

张成。

但这些向量一般不正交，也不归一，所以不能直接拿来定义“第几个复杂度层级”。因此我们用 Lanczos 正交化，把它们变成一组正交归一基：

$$
|O_0), |O_1), |O_2),\ldots
$$

先定义内积，比如无限温度内积：

$$
(A|B)=\frac{1}{D}\text{Tr}(A^\dagger B).
$$

然后归一化初始算符：

$$
|O_0)=\frac{|O)}{\sqrt{(O|O)}}.
$$

接下来做递推。

第一步：

$$
|A_1)=\mathcal L|O_0).
$$

定义

$$
b_1=\sqrt{(A_1|A_1)}.
$$

然后

$$
|O_1)=\frac{1}{b_1}|A_1).
$$

第二步：

$$
|A_2)=\mathcal L|O_1)-b_1|O_0).
$$

定义

$$
b_2=\sqrt{(A_2|A_2)}.
$$

然后

$$
|O_2)=\frac{1}{b_2}|A_2).
$$

一般递推为

$$
|A_{n+1})
=
\mathcal L|O_n)-b_n|O_{n-1}),
$$

$$
b_{n+1}
=
\sqrt{(A_{n+1}|A_{n+1})},
$$

$$
|O_{n+1})
=
\frac{1}{b_{n+1}}|A_{n+1}).
$$

于是得到 Krylov 基

$$
|O_0),|O_1),|O_2),\ldots
$$

并且满足

$$
(O_m|O_n)=\delta_{mn}.
$$

在这组基底下，Liouvillian 变成三对角形式：

$$
\mathcal L|O_n)
=
b_{n+1}|O_{n+1})
+
b_n|O_{n-1}).
$$

更一般的 Lanczos 递推里可能还会有一个对角项 $a_n|O_n)$：

$$
\mathcal L|O_n)
=
b_{n+1}|O_{n+1})
+
a_n|O_n)
+
b_n|O_{n-1}).
$$

但在 Krylov complexity 的常见算符增长设置中，常选取使对角项消失或不重要的 convention，所以讲义里通常写成只有 $b_n$ 的形式。

这里 $b_{n+1}$ 的含义非常重要：

> $b_{n+1}$ 是 $\mathcal L|O_n)$ 中，扣掉旧方向后，剩下的新方向的大小。

也就是说，$b_{n+1}$ 衡量的是：  
当前第 $n$ 层复杂度的算符，在 Hamiltonian 作用下，有多强地生成第 $n+1$ 层的新复杂方向。

---

## 10. Lanczos 算法：把复杂问题变成一条链

通过 Lanczos 算法，我们得到了一组 Krylov 基：

$$
|O_0), |O_1), |O_2), |O_3),\ldots
$$

在这组基底中，Liouvillian 的作用具有特别简单的形式：

$$
\mathcal{L}|O_n)=b_{n+1}|O_{n+1})+b_n|O_{n-1}).
$$

这条公式的物理图像非常漂亮：原来复杂的算符增长问题，被映射成了一个粒子在一维半无限链上的跳跃问题。

这条链可以画成：

$$
0 \leftrightarrow 1 \leftrightarrow 2 \leftrightarrow 3 \leftrightarrow \cdots
$$

第 $n$ 个格点对应第 $n$ 个 Krylov 基矢 $|O_n)$。  
从 $n$ 跳到 $n+1$ 的强度就是 $b_{n+1}$。

所以，$b_n$ 决定了算符在 Krylov 链上向复杂方向传播的速度。

---

## 11. Krylov complexity 的定义

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

## 12. 为什么 Lanczos 系数比 $K(t)$ 更根本？

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

## 13. Universal Operator Growth Hypothesis

文章的核心假说可以用一句话概括：

> 在一般非可积量子多体系统中，Lanczos 系数 $b_n$ 会以尽可能快的方式增长；在很多情况下，这种增长近似为线性增长。

数学上写作：

$$
b_n\sim \alpha n.
$$

这里 $\alpha$ 是一个增长率。它可以看作系统本身的动力学特征，类似于一种“算符增长速度”。

但需要特别注意：

> $b_n\sim \alpha n$ 不是说 Krylov complexity 线性增长。  
> 它说的是 Krylov 链上从第 $n-1$ 层到第 $n$ 层的 hopping strength 随 $n$ 线性变大。

也就是说，越复杂的 Krylov 层级，越容易继续生成更复杂的新方向。

---

## 14. 为什么 $b_n\sim \alpha n$ 会导致 $K(t)\sim e^{2\alpha t}$？

先回到 Krylov 链图像。在 Krylov 基下，

$$
|O(t))=\sum_n \phi_n(t)|O_n).
$$

时间演化方程变成类似一维链上的波包传播。忽略不影响增长率的相位 convention，可以把它理解为：

$$
i\frac{d\phi_n}{dt}
=
b_{n+1}\phi_{n+1}
+
b_n\phi_{n-1}.
$$

这很像一个粒子在一维链上跳跃，只是跳跃强度不是常数，而是依赖位置：

$$
0\leftrightarrow 1\leftrightarrow 2\leftrightarrow 3\leftrightarrow\cdots
$$

从 $n$ 到 $n+1$ 的 hopping strength 是 $b_{n+1}$。

如果 $b_n$ 是常数，比如

$$
b_n=b,
$$

那么波包大致以有限速度向右传播，复杂度增长近似是线性的：

$$
K(t)\sim t.
$$

但如果

$$
b_n\sim \alpha n,
$$

那么越往右，跳跃越快。也就是说，波包跑到更复杂的位置后，会因为当地 hopping 更大而跑得更快。

这就是一种“自加速”过程。

可以用一个半经典近似来理解。假设 Krylov 波包的位置是 $n(t)$。在第 $n$ 层附近，最大传播速度大约正比于 hopping：

$$
\frac{dn}{dt}\sim 2b_n.
$$

如果

$$
b_n\sim \alpha n,
$$

那么

$$
\frac{dn}{dt}\sim 2\alpha n.
$$

这个微分方程的解是

$$
n(t)\sim e^{2\alpha t}.
$$

而 Krylov complexity 本质上就是平均位置：

$$
K(t)=\sum_n n|\phi_n(t)|^2.
$$

所以

$$
K(t)\sim e^{2\alpha t}.
$$

更精确地，在理想化模型中，若 Lanczos 系数严格线性增长，Krylov complexity 常出现类似

$$
K(t)\propto \sinh^2(\alpha t)
$$

的形式。长时间但未饱和时，

$$
\sinh^2(\alpha t)\sim \frac{1}{4}e^{2\alpha t}.
$$

所以得到

$$
K(t)\sim e^{2\alpha t}.
$$

---

## 15. $b_n$ 的线性增长本身说明了什么？

这点非常重要。

$$
b_n\sim \alpha n
$$

不是说复杂度本身线性增长。它说的是：

> Liouvillian 在 Krylov 链上连接第 $n$ 层和第 $n+1$ 层的能力，随复杂度层级 $n$ 线性增强。

也就是：

- 第 $1$ 层算符生成第 $2$ 层新方向的能力较弱；
- 第 $10$ 层算符生成第 $11$ 层新方向的能力更强；
- 第 $100$ 层算符生成第 $101$ 层新方向的能力更强；
- 并且这种增强大致正比于 $n$。

物理上可以这样理解：

> 一个已经很复杂的算符，和 Hamiltonian 对易后，可以产生更多新的复杂结构。

在混沌多体系统中，算符越复杂，它包含的多体成分越多；每个成分又可以和 Hamiltonian 的局域项发生对易，产生新的成分。因此新方向的生成能力会随着复杂度层级增加。

这就是 $b_n$ 线性增长的直观意义。

---

## 16. 一个非常有用的比喻

把 Krylov 层级 $n$ 想成“复杂度城市”的编号。

- $n=0$：最简单的城市；
- $n=1$：稍复杂；
- $n=10$：复杂；
- $n=100$：非常复杂。

$b_n$ 是从城市 $n-1$ 到城市 $n$ 的高速公路宽度。

如果高速公路宽度恒定：

$$
b_n=b,
$$

那你大概匀速向远处走，复杂度线性增长。

如果高速公路越往后越宽：

$$
b_n\sim \alpha n,
$$

那你越走越快，因为越复杂的地方通向更复杂地方的通道越多。于是复杂度指数增长。

所以 $b_n\sim \alpha n$ 的真正含义是：

> 算符增长没有遇到瓶颈；相反，越复杂越容易生成更复杂的新方向。

这就是它为什么和量子混沌联系起来。

---

## 17. 怎么理解 $\alpha$？

$\alpha$ 的量纲是

$$
[\alpha]=\frac{1}{\text{time}}.
$$

因为 $b_n$ 来自 Liouvillian，而 Liouvillian 的量纲是能量，也就是 $1/\text{time}$。

所以 $\alpha$ 可以理解成 Krylov 空间中的增长率：

$$
b_n\sim \alpha n.
$$

如果 $\alpha$ 大，说明同样的复杂度层级 $n$，系统更快生成新方向。  
如果 $\alpha$ 小，说明算符增长较慢。

所以 $\alpha$ 是一种系统动力学特征，有点像 Lyapunov 指数，但它不是同一个东西。Parker 论文里的关系更接近：

$$
\lambda_L\le 2\alpha.
$$

也就是说，Krylov 增长率给 OTOC Lyapunov 指数提供了一个上界。

---

## 18. 为什么这和量子混沌有关？

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

## 19. 混沌系统、可积系统和自由系统的区别

这篇文章的一个核心物理图像是：

### 19.1 自由系统

自由系统中准粒子之间不发生真正复杂的相互作用。算符虽然会扩散，但结构通常比较简单。对应地，Lanczos 系数增长较慢，Krylov complexity 不会表现出强烈的指数增长。

### 19.2 可积系统

可积系统有大量守恒量。这些守恒量限制了算符能够探索的方向。Lanczos 系数可能增长，但往往不具有一般混沌系统中那种稳定、普适的线性增长。

### 19.3 混沌系统

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

## 20. 和谱函数、矩的关系

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

## 21. 一维系统中的对数修正

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

## 22. 这篇文章真正教给我们的是什么？

Parker 等人的工作可以总结成三个层次。

### 22.1 第一层：形式上的重写

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

### 22.2 第二层：动力学核心变量

Lanczos 系数 $b_n$ 决定 Krylov 链上的传播。

如果 $b_n$ 增长慢，复杂度增长慢。  
如果 $b_n$ 线性增长，复杂度指数增长。

### 22.3 第三层：物理假说

一般混沌多体系统中的算符增长是“最快允许”的。  
这种最快增长体现为：

$$
b_n\sim \alpha n.
$$

这就是 **Universal Operator Growth Hypothesis**。

---

## 23. 初学者应该怎么读原文？

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

## 24. 可能的课堂讲解结构

如果要把这篇文章讲成一次 30–45 分钟报告，可以这样安排：

### 24.1 Motivation：为什么研究算符增长？

介绍 Heisenberg 演化下局域算符变复杂的现象。  
说明这和量子混沌、信息扰乱、热化有关。

### 24.2 Operator Hilbert Space

把算符当作向量。  
定义内积。  
引入 Liouvillian。

### 24.3 Krylov Space

解释为什么

$$
O(t)=e^{i\mathcal L t}O
$$

自然只涉及

$$
O,\mathcal LO,\mathcal L^2O,\ldots.
$$

强调 Krylov space 是包含 $O(t)$ 的最小动力学空间。

### 24.4 Krylov Basis and Lanczos Coefficients

解释如何从初始算符生成 Krylov basis。  
说明 Lanczos 系数是 Krylov 链上的 hopping amplitude。

### 24.5 Krylov Complexity

定义：

$$
K(t)=\sum_n n|\phi_n(t)|^2.
$$

解释它是 Krylov 链上的平均位置。

### 24.6 Universal Operator Growth Hypothesis

核心公式：

$$
b_n\sim \alpha n.
$$

物理意义：混沌系统中算符以最快允许速度增长。

### 24.7 Consequence

由线性 $b_n$ 推出：

$$
K(t)\sim e^{2\alpha t}.
$$

并说明：

$$
\lambda_L\le 2\alpha.
$$

### 24.8 Summary

一句话总结：

> Krylov complexity 把量子混沌中的算符增长问题转化为 Krylov 链上的传播问题，而 Lanczos 系数的线性增长是混沌算符增长的核心标志。

---

## 25. 最后总结

Parker 等人的文章之所以重要，是因为它给出了一个非常清晰的框架：

1. 把算符演化看成算符空间中的运动；
2. 定义 Liouvillian $\mathcal L=[H,\cdot]$；
3. 观察到 $O(t)$ 只依赖 $O,\mathcal LO,\mathcal L^2O,\ldots$；
4. 用这些向量张成 Krylov space；
5. 用 Lanczos 算法构造正交归一 Krylov 基；
6. 在 Krylov 基下，Liouvillian 变成一维链；
7. 用 Krylov complexity 衡量算符波包在链上的平均位置；
8. 用 Lanczos 系数 $b_n$ 描述复杂度增长的动力学；
9. 提出混沌系统中 $b_n$ 线性增长的普适假说；
10. 将 Krylov complexity、OTOC、Lyapunov 指数和量子混沌联系起来。

对于初学者来说，最重要的不是掌握所有技术细节，而是记住这条逻辑链：

$$
\text{Hamiltonian dynamics}
\Rightarrow
\text{Liouvillian dynamics}
\Rightarrow
\text{operator growth}
\Rightarrow
\text{Krylov space}
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

而 Parker 论文最核心的一句话可以概括为：

> 混沌系统中的算符增长，可以通过 Krylov 链上 Lanczos 系数的线性增长来刻画；这种线性增长导致 Krylov complexity 的指数增长。