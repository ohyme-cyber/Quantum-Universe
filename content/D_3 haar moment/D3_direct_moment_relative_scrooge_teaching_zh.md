---
title: " $D_3$-对称 Haar 系综的高阶矩与相对 Scrooge-design"
date: 2026-06-04
tags:
  - D3-symmetry
  - Calculation
  - Tutorial
---
## 直接矩比较法：中文学习笔记

> **用途**：这是一份用于边读边提问的教学笔记。它聚焦于“写出两个系综的 $t$ 阶矩公式，并在共同分块上直接比较”的证明路线。
>
> **核心提醒**：文中 $D_3$ 是物理空间上的对称；$S_t$ / replica permutation 是高阶矩复制空间中的结构，不是新的物理对称性。

## 阅读导航

1. [我们究竟想证明什么](#我们究竟想证明什么)
2. [先分清两种不同的对称](#先分清两种不同的对称)
3. [第一层分块：sector occupation numbers](#第一层分块每个物理扇区出现了多少份复制)
4. [第二层分块：二维 sector 的 replica 交换模式](#第二层分块二维扇区内部的-replica-交换模式)
5. [$D_3$-Haar 的精确高阶矩](#d_3-haar-系综的精确高阶矩)
6. [Scrooge 的精确高阶矩](#scrooge-系综的精确高阶矩)
7. [直接比较与二维内部矩阵的抵消](#直接比较为什么二维内部矩阵会抵消)
8. [逐块误差与整体结论](#为什么相对误差是-oa_n-1b_n-1c_n-1)
9. [一页证明链条与问题清单](#整条证明链条的一页总结)

---

<a id="我们究竟想证明什么"></a>
# 我们究竟想证明什么

我们已有物理 Hilbert 空间的 $D_3$ 分解

$$
\mathcal H_{AB}
  \simeq
  \mathcal M_1\otimes\mathcal V_1
  \oplus
  \mathcal M_{-1}\otimes\mathcal V_{-1}
  \oplus
  \mathcal M_2\otimes\mathcal V_2,
$$

其中

$$
\dim\mathcal V_1=\dim\mathcal V_{-1}=1,
  \qquad
  \dim\mathcal V_2=2,
$$

以及

$$
\dim\mathcal M_1=a_N,
  \qquad
  \dim\mathcal M_{-1}=b_N,
  \qquad
  \dim\mathcal M_2=c_N.
$$

在本文的 $N$ 个 qutrit 模型中，

$$
a_N=\frac{3^{N-1}+1}{2},
  \qquad
  b_N=\frac{3^{N-1}-1}{2},
  \qquad
  c_N=3^{N-1}.
$$

记

$$
R:=\rho_0(\mathcal V_2)^T.
$$

则两个系综共享的一阶矩为

$$
\rho_{AB}^{D_3}
  =
  \frac{W_1}{a_N}I_{\mathcal M_1}
  \oplus
  \frac{W_{-1}}{b_N}I_{\mathcal M_{-1}}
  \oplus
  \frac{W_2}{c_N}I_{\mathcal M_2}\otimes R.
$$

我们的目标不是仅仅证明两个系综的一阶矩相同，而是证明对于固定的 $t$，它们的 $t$ 阶矩相对接近：

$$
(1-\varepsilon_t)\rho_{\mathrm{Scr.}}^{(t)}[\rho_{AB}^{D_3}]
  \preceq
  \rho_{D_3}^{(t)}
  \preceq
  (1+\varepsilon_t)\rho_{\mathrm{Scr.}}^{(t)}[\rho_{AB}^{D_3}],
$$

并希望

$$
\varepsilon_t
  =O_t(a_N^{-1}+b_N^{-1}+c_N^{-1}).
$$

本教学稿采用的路线是：

> **本笔记的证明路线**：先分别写出 $D_3$-Haar 系综和 Scrooge 系综的精确 $t$ 阶矩；再把它们放到同一组 replicated-space blocks 中；最后直接比较每一个块上的系数与矩阵因子。

这与 “先把 Scrooge 理解为随机径向变量，再做 Taylor 展开” 的路线不同。

<a id="先分清两种不同的对称"></a>
# 先分清两种不同的对称

## 物理上的 $D_3$ symmetry

物理对称性作用在单份系统空间 $\mathcal H_{AB}$ 上。它将空间分成

$$
1,\qquad -1,\qquad 2
$$

三个 $D_3$ 不可约表示类型。二维扇区写为

$$
\mathcal H_2=\mathcal M_2\otimes\mathcal V_2.
$$

其中 $\mathcal M_2$ 表示有多少份二维不可约表示，$\mathcal V_2$ 是每一份二维不可约表示内部的二维空间。

$D_3$-对称 Haar 动力学的结构是

$$
U_{\rm sym}
  =
  U_1\otimes I_{\mathcal V_1}
  \oplus
  U_{-1}\otimes I_{\mathcal V_{-1}}
  \oplus
  U_2\otimes I_{\mathcal V_2}.
$$

所以随机性只作用在 $\mathcal M_1,\mathcal M_{-1},\mathcal M_2$ 上，不随机化 $\mathcal V_2$。 这就是 $R=\rho_0(\mathcal V_2)^T$ 能够被保留的原因。

## 矩计算中的 replica permutation symmetry

$t$ 阶矩包含

$$
\left(|\psi\rangle\langle\psi|\right)^{\otimes t}.
$$

这里出现了同一个态的 $t$ 份复制：

$$
|\psi\rangle^{\otimes t}.
$$

任意交换这 $t$ 份复制都不改变它：

$$
P_\pi|\psi\rangle^{\otimes t}
  =|\psi\rangle^{\otimes t},
  \qquad \pi\in S_t.
$$

因此

$$
|\psi\rangle^{\otimes t}
  \in
  \operatorname{Sym}^t(\mathcal H_{AB}).
$$

这不是新的物理对称性，而是因为我们在计算同一个纯态的高阶矩。

| 结构              | 作用空间                               | 来源               |
|:------------------|:---------------------------------------|:-------------------|
| $D_3$ symmetry    | 单份物理空间 $\mathcal H_{AB}$         | 系统的物理对称性   |
| $S_t$ permutation | 复制空间 $\mathcal H_{AB}^{\otimes t}$ | 高阶矩复制同一纯态 |

<a id="第一层分块每个物理扇区出现了多少份复制"></a>
# 第一层分块：每个物理扇区出现了多少份复制

令

$$
\mathcal H_1\simeq\mathcal M_1,
  \qquad
  \mathcal H_{-1}\simeq\mathcal M_{-1},
  \qquad
  \mathcal H_2=\mathcal M_2\otimes\mathcal V_2.
$$

因为我们处于整体 replica-symmetric 子空间，所以

$$
\begin{aligned}
  \operatorname{Sym}^t(\mathcal H_{AB})
  \simeq
  \bigoplus_{n_1+n_{-1}+n_2=t}
  &\operatorname{Sym}^{n_1}(\mathcal M_1)
  \otimes
  \operatorname{Sym}^{n_{-1}}(\mathcal M_{-1})
  \\
  &\otimes
  \operatorname{Sym}^{n_2}(\mathcal M_2\otimes\mathcal V_2).
\end{aligned}
$$

这里

$$
\bm n=(n_1,n_{-1},n_2)
$$

的意思非常简单：在 $t$ 份 replicas 中，分别有多少份来自 $1$、$-1$、$2$ 三个物理 $D_3$ sectors。

例如当 $t=2$ 时，

$$
(1,0,1)
$$

表示一个 replica 在 $\mathcal H_1$ 中，另一个 replica 在 $\mathcal H_2$ 中； 而

$$
(0,0,2)
$$

表示两个 replicas 都在二维物理扇区 $\mathcal H_2$ 中。

不同 $\bm n$ 的 ket–bra 交叉项会在各扇区独立 Haar 相位平均后消失， 所以两个要比较的矩都会按照 $\bm n$ 分块。

<a id="第二层分块二维扇区内部的-replica-交换模式"></a>
# 第二层分块：二维扇区内部的 replica 交换模式

二维物理扇区不是一个单纯的空间，而是

$$
\mathcal H_2=\mathcal M_2\otimes\mathcal V_2.
$$

一个基态可写作

$$
|\alpha,r\rangle,
$$

其中 $\alpha$ 是 multiplicity 标签，$r=1,2$ 是二维 irrep 内部标签。

当 $n_2$ 份 replicas 都落在二维 sector 时，需要分析

$$
\operatorname{Sym}^{n_2}(\mathcal M_2\otimes\mathcal V_2).
$$

Cauchy 分解告诉我们

$$
\operatorname{Sym}^{n_2}(\mathcal M_2\otimes\mathcal V_2)
  \simeq
  \bigoplus_{\substack{\lambda\vdash n_2\\\ell(\lambda)\le2}}
  \mathbb S_\lambda(\mathcal M_2)\otimes\mathbb S_\lambda(\mathcal V_2).
$$

## 最直观的 $n_2=2$ 例子

当有两个二维-sector replicas 时，

$$
\begin{aligned}
  \operatorname{Sym}^2(\mathcal M_2\otimes\mathcal V_2)
  \simeq{}&
  \left[\operatorname{Sym}^2\mathcal M_2\otimes\operatorname{Sym}^2\mathcal V_2\right]
  \\
  &\oplus
  \left[\wedge^2\mathcal M_2\otimes\wedge^2\mathcal V_2\right].
\end{aligned}
$$

这并不是说系统新增了两个 $D_3$ sectors，而是在说交换两份完整 replicas 时：

- multiplicity 标签与内部标签都对称，整体当然对称；

- multiplicity 标签与内部标签都反对称时，两个负号抵消，整体仍然对称。

因此 $\lambda$ 只是 “复制指标的交换模式”，不是 $D_3$ irrep 标签。 完整块标签是

$$
\alpha=(n_1,n_{-1},n_2,\lambda).
$$

<a id="d_3-haar-系综的精确高阶矩"></a>
# $D_3$-Haar 系综的精确高阶矩

随机态可写为

$$
|\Psi\rangle
  =
  \sqrt{W_1}|u_1\rangle
  \oplus
  \sqrt{W_{-1}}|u_{-1}\rangle
  \oplus
  \sqrt{W_2}(U_2\otimes I_{\mathcal V_2})|\xi_R\rangle,
$$

其中 $u_1,u_{-1}$ 是 Haar 随机向量，$U_2\in U(c_N)$ Haar 随机，而 $|\xi_R\rangle$ 的 $\mathcal V_2$ 约化态为 $R$。

## 一维 sectors 的矩

若 $u$ 是 $\mathbb C^d$ 中的 Haar 随机单位向量，则

$$
\mathbb E\left(|u\rangle\langle u|\right)^{\otimes n}
  =
  \frac{n!}{(d)_n}I_{\operatorname{Sym}^n(\mathbb C^d)},
  \qquad
  (d)_n=d(d+1)\cdots(d+n-1).
$$

所以 $1$ 与 $-1$ sectors 的高阶矩只给出对称空间上的恒等算符与已知维数因子。

## 二维 sector 的 Weingarten 平均

二维 sector 的 $n$ 阶矩为

$$
\Omega_n[R]
  =
  \mathbb E_{U_2}
  \left[
    \bigl((U_2\otimes I)|\xi_R\rangle\langle\xi_R|
    (U_2^\dagger\otimes I)\bigr)^{\otimes n}
  \right].
$$

使用 unitary Weingarten calculus，形式上可写为

$$
\Omega_n[R]
  =
  \sum_{\pi,\sigma\in S_n}
  \operatorname{Wg}_{c_N}(\pi^{-1}\sigma)
  P_\sigma^{\mathcal M_2}
  \otimes
  R^{\otimes n}P_\pi^{\mathcal V_2}.
$$

这条式子说明 Haar 平均可以显式算出来，但真正适合后续比较的是把它投影到 $\lambda$ 块：

$$
\boxed{
  \Omega_{n,\lambda}[R]
  =
  \frac{f^\lambda}{d_\lambda(c_N)}
  I_{\mathbb S_\lambda(\mathcal M_2)}
  \otimes
  \mathbb S_\lambda(R).
  }
$$

其中

$$
f^\lambda=\dim[\lambda],
  \qquad
  d_\lambda(c_N)=\dim\mathbb S_\lambda(\mathbb C^{c_N}).
$$

直观解释是：Haar 随机性把 multiplicity 一边抹平成恒等算符， 但 $\mathcal V_2$ 一边仍保留由初态决定的 $\mathbb S_\lambda(R)$。

## 完整的 $D_3$ 矩块公式

在块

$$
\alpha=(n_1,n_{-1},n_2,\lambda)
$$

上，记

$$
D_\alpha:=\Pi_\alpha\rho_{D_3}^{(t)}\Pi_\alpha.
$$

则

$$
\boxed{
\begin{aligned}
  D_\alpha
  ={}&
  \frac{t!}{n_2!}
  \frac{W_1^{n_1}W_{-1}^{n_{-1}}W_2^{n_2}}
  {(a_N)_{n_1}(b_N)_{n_{-1}}}
  \frac{f^\lambda}{d_\lambda(c_N)}
  \\
  &\times
  I_{\operatorname{Sym}^{n_1}(\mathcal M_1)}
  \otimes
  I_{\operatorname{Sym}^{n_{-1}}(\mathcal M_{-1})}
  \otimes
  I_{\mathbb S_\lambda(\mathcal M_2)}
  \otimes
  \mathbb S_\lambda(R).
\end{aligned}}
$$

> **公式 A｜$D_3$-Haar 的精确块矩**：上式是第一个要比较的精确公式。

<a id="scrooge-系综的精确高阶矩"></a>
# Scrooge 系综的精确高阶矩

令

$$
\rho:=\rho_{AB}^{D_3}.
$$

Scrooge 系综可用 adjusted Gaussian 表示。对于 $t\ge2$，其 $t$ 阶矩满足

$$
\rho_{\mathrm{Scr.}}^{(t)}[\rho]
  =
  \frac{t!}{\Gamma(t-1)}
  \int_0^\infty
  s^{t-2}
  \frac{\Pi_{\operatorname{Sym}}^{(t)}B(s)^{\otimes t}}
  {\det(I+s\rho)}\,ds,
$$

其中

$$
B(s)=\rho(I+s\rho)^{-1}.
$$

根据一阶矩的分块结构，

$$
\begin{aligned}
  B(s)
  ={}&
  \frac{W_1/a_N}{1+sW_1/a_N}I_{\mathcal M_1}
  \oplus
  \frac{W_{-1}/b_N}{1+sW_{-1}/b_N}I_{\mathcal M_{-1}}
  \\
  &\oplus
  \frac{W_2}{c_N}I_{\mathcal M_2}\otimes R_s,
\end{aligned}
$$

其中

$$
R_s
  =
  R\left(I_{\mathcal V_2}+\frac{sW_2}{c_N}R\right)^{-1}.
$$

并且

$$
\begin{aligned}
  \Delta_N(s)
  &:={}
  \det(I+s\rho)
  \\
  &={}
  \left(1+\frac{sW_1}{a_N}\right)^{a_N}
  \left(1+\frac{sW_{-1}}{b_N}\right)^{b_N}
  \det\left(I+\frac{sW_2}{c_N}R\right)^{c_N}.
\end{aligned}
$$

因此同一个 $\alpha$ 块上的 Scrooge 矩为

$$
\boxed{
\begin{aligned}
  S_\alpha
  ={}&
  \frac{t!W_1^{n_1}W_{-1}^{n_{-1}}W_2^{n_2}}
  {\Gamma(t-1)a_N^{n_1}b_N^{n_{-1}}c_N^{n_2}}
  \\
  &\times
  \int_0^\infty
  s^{t-2}\Delta_N(s)^{-1}
  q_{\bm n,N}(s)
  \\
  &\qquad\times
  I_{\operatorname{Sym}^{n_1}(\mathcal M_1)}
  \otimes
  I_{\operatorname{Sym}^{n_{-1}}(\mathcal M_{-1})}
  \otimes
  I_{\mathbb S_\lambda(\mathcal M_2)}
  \otimes
  \mathbb S_\lambda(R_s)
  \,ds,
\end{aligned}}
$$

其中

$$
q_{\bm n,N}(s)
  =
  \left(1+\frac{sW_1}{a_N}\right)^{-n_1}
  \left(1+\frac{sW_{-1}}{b_N}\right)^{-n_{-1}}.
$$

> **公式 B｜Scrooge 的精确块矩**：上式是第二个要比较的精确公式。

<a id="直接比较为什么二维内部矩阵会抵消"></a>
# 直接比较：为什么二维内部矩阵会抵消

我们要比较的不是普通差值，而是相对差值

$$
D_\alpha^{-1/2}(S_\alpha-D_\alpha)D_\alpha^{-1/2}.
$$

注意到

$$
R_s
  =
  R\left(I+\frac{sW_2}{c_N}R\right)^{-1},
$$

并且两个因子互相交换。因此

$$
\mathbb S_\lambda(R_s)
  =
  \mathbb S_\lambda(R)
  \mathbb S_\lambda\left(
    \left(I+\frac{sW_2}{c_N}R\right)^{-1}
  \right).
$$

而 $D_\alpha$ 中正好包含

$$
\mathbb S_\lambda(R).
$$

所以做相对归一化以后，这一因子被精确约掉。

定义

$$
Q_{\lambda,N}(s)
  :=
  \mathbb S_\lambda\left(
    \left(I+\frac{sW_2}{c_N}R\right)^{-1}
  \right).
$$

那么

$$
\boxed{
\begin{aligned}
  D_\alpha^{-1/2}S_\alpha D_\alpha^{-1/2}
  ={}&
  A_{\alpha,N}
  \frac1{\Gamma(t-1)}
  \int_0^\infty
  s^{t-2}\Delta_N(s)^{-1}
  q_{\bm n,N}(s)
  Q_{\lambda,N}(s)
  \,ds,
\end{aligned}}
$$

其中

$$
A_{\alpha,N}
  =
  \frac{(a_N)_{n_1}}{a_N^{n_1}}
  \frac{(b_N)_{n_{-1}}}{b_N^{n_{-1}}}
  \frac{n_2!d_\lambda(c_N)}{f^\lambda c_N^{n_2}}.
$$

> **公式 C｜直接比较的核心**：它把一个复杂的矩阵比较化成了 “一个接近 $1$ 的离散系数” 加上 “一个接近单位算符的积分”。

<a id="为什么相对误差是-oa_n-1b_n-1c_n-1"></a>
# 为什么相对误差是 $O(a_N^{-1}+b_N^{-1}+c_N^{-1})$

令

$$
\delta_N=a_N^{-1}+b_N^{-1}+c_N^{-1}.
$$

## 离散维数系数接近 $1$

固定 $t$ 时，$n_1,n_{-1},n_2$ 都不会随 $N$ 增长。因此

$$
\frac{(a_N)_{n_1}}{a_N^{n_1}}
  =1+O_t(a_N^{-1}),
  \qquad
  \frac{(b_N)_{n_{-1}}}{b_N^{n_{-1}}
  }
  =1+O_t(b_N^{-1}).
$$

同时 hook-content 公式给出

$$
\frac{n_2!d_\lambda(c_N)}{f^\lambda c_N^{n_2}}
  =1+O_t(c_N^{-1}).
$$

所以

$$
A_{\alpha,N}=1+O_t(\delta_N).
$$

## 积分核接近 Gamma 分布核

因为

$$
W_1+W_{-1}+W_2=1,
  \qquad
  \operatorname{Tr}R=1,
$$

行列式因子满足

$$
\Delta_N(s)^{-1}
  =
  e^{-s}\left[1+O(s^2\delta_N)\right]
$$

在主要积分区间上一致成立。

另外，

$$
q_{\bm n,N}(s)
  =1+O_t\left(s(a_N^{-1}+b_N^{-1})\right),
$$

而

$$
\|Q_{\lambda,N}(s)-I\|_\infty
  \le C_t\frac{s}{c_N}.
$$

因此整个积分核为

$$
e^{-s}
  \left[
  I+O_t\bigl((s+s^2)\delta_N\bigr)
  \right].
$$

因为

$$
\frac1{\Gamma(t-1)}
  \int_0^\infty s^{t-2}e^{-s}\,ds=1,
$$

且

$$
\int_0^\infty s^{t-2}e^{-s}(s+s^2)\,ds
$$

对固定 $t$ 只是常数，所以

$$
\frac1{\Gamma(t-1)}
  \int_0^\infty
  s^{t-2}\Delta_N(s)^{-1}
  q_{\bm n,N}(s)Q_{\lambda,N}(s)
  \,ds
  =I+O_t(\delta_N).
$$

合并两部分，就得到

$$
\boxed{
  \left\|
    D_\alpha^{-1/2}(S_\alpha-D_\alpha)D_\alpha^{-1/2}
  \right\|_\infty
  \le
  C_t(a_N^{-1}+b_N^{-1}+c_N^{-1}).
}
$$

## 为什么这里不再需要 $\kappa_{\mathcal V_2}^{2t}$

径向 Taylor 路线会先估计二维内部的变换，再用 $D_\alpha^{-1/2}$ 做相对归一化；在这个过程中可能粗糙地引入

$$
\|R\|^t\|R^{-1}\|^t
  =\kappa_{\mathcal V_2}^t
$$

或更大的损失。

直接矩路线不同：我们先写出两个块的精确公式，立即看到 $D_\alpha$ 与 $S_\alpha$ 中共同的

$$
\mathbb S_\lambda(R)
$$

在相对归一化中精确抵消。因此得到更强的、不显含条件数的估计

$$
C_t(a_N^{-1}+b_N^{-1}+c_N^{-1}).
$$

当然，因为 $\kappa_{\mathcal V_2}\ge1$，它自动蕴含较保守的版本

$$
C_t\kappa_{\mathcal V_2}^{2t}(a_N^{-1}+b_N^{-1}+c_N^{-1}).
$$

# 从逐块相对误差到整体 relative Loewner bound

由式（逐块相对误差界），若记

$$
\varepsilon_t=C_t(a_N^{-1}+b_N^{-1}+c_N^{-1}),
$$

则每个非零块上有

$$
(1-\varepsilon_t)D_\alpha
  \preceq
  S_\alpha
  \preceq
  (1+\varepsilon_t)D_\alpha.
$$

因为不同 $\alpha$ 块彼此正交，可以直接求直和：

$$
(1-\varepsilon_t)\rho_{D_3}^{(t)}
  \preceq
  \rho_{\mathrm{Scr.}}^{(t)}[\rho_{AB}^{D_3}]
  \preceq
  (1+\varepsilon_t)\rho_{D_3}^{(t)}.
$$

当 $N$ 足够大使得 $\varepsilon_t<1/2$ 时，反转参考算符方向可得

$$
(1-2\varepsilon_t)\rho_{\mathrm{Scr.}}^{(t)}[\rho_{AB}^{D_3}]
  \preceq
  \rho_{D_3}^{(t)}
  \preceq
  (1+2\varepsilon_t)\rho_{\mathrm{Scr.}}^{(t)}[\rho_{AB}^{D_3}].
$$

这正是 relative Scrooge-design 性质。

# 为什么整体绝对误差也小

从逐块估计可得

$$
\|S_\alpha-D_\alpha\|_1
  \le
  \varepsilon_t\operatorname{Tr}D_\alpha.
$$

因为这些块正交，且

$$
\sum_\alpha\operatorname{Tr}D_\alpha=\operatorname{Tr}\rho_{D_3}^{(t)}=1,
$$

所以

$$
\left\|
  \rho_{\mathrm{Scr.}}^{(t)}[\rho_{AB}^{D_3}]
  -\rho_{D_3}^{(t)}
  \right\|_1
  \le
  \varepsilon_t.
$$

也就是说，相对逐块误差控制自动给出了整体 additive trace-norm 控制，而且不会因为块的数量而额外放大误差。

<a id="整条证明链条的一页总结"></a>
# 整条证明链条的一页总结

1.  物理空间由 $D_3$ symmetry 分成 $1,-1,2$ 三个 sectors。

2.  计算 $t$ 阶矩时进入复制空间，并自动限制在 $\operatorname{Sym}^t(\mathcal H_{AB})$。

3.  先按 occupation numbers $(n_1,n_{-1},n_2)$ 分块。

4.  对二维 sector 的 $n_2$ 份 replicas，再按 Young diagram $\lambda$ 分块。

5.  利用 Haar-vector moment 与 Weingarten/Schur–Weyl calculus 写出 $D_\alpha$。

6.  利用 adjusted Gaussian 的 Laplace integral 写出 $S_\alpha$。

7.  做相对归一化；共同的 $\mathbb S_\lambda(R)$ 精确抵消。

8.  用 rising factorial、hook-content 与积分核展开证明每块相差 $O_t(a_N^{-1}+b_N^{-1}+c_N^{-1})$。

9.  由于各块正交，逐块 Loewner bound 直接重组成整体 relative design bound。

# 阅读时建议重点检查的问题

阅读论文版证明时，可以逐项追问：

1.  为什么 $t$ 阶矩只在 replica-symmetric subspace 中？

2.  为什么 $\lambda$ 不是新的 $D_3$ irrep？

3.  二维 sector 的 Weingarten 求和为什么等价于式（二维 sector 的 $\lambda$-块公式）？

4.  Scrooge 的积分公式式（Scrooge 的精确积分矩公式） 如何由 Gaussian 调整测度得到？

5.  为什么相对归一化时 $\mathbb S_\lambda(R)$ 精确抵消？

6.  为什么积分尾部不会破坏 $O_t(a_N^{-1}+b_N^{-1}+c_N^{-1})$ 的阶数？
