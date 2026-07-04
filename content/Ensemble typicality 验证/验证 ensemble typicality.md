---
title: Analytic Verification of Ensemble Typicality--Background, Goal, and Moment-Concentration Strategy
date: 2026-07-04
tags:
  - Ensemble-typicality
  - Minimal-M
---
## 0. Background: 为什么需要验证 ensemble typicality？

在 projected-ensemble setting 中，我们考虑一个 global generator ensemble

$$  
D={p_d,|\Psi_d\rangle},  
$$

以及一个作用在 complementary subsystem $B$ 上的 projective measurement basis

$$  
M_B={|m_B\rangle}.  
$$

给定一个 global pure state $|\Psi\rangle\in \mathcal H_A\otimes \mathcal H_B$，测量 $B$ 后，subsystem $A$ 上得到 conditional projected state

# $$  
|\psi_{\Psi,m_B}\rangle=

\frac{  
(I_A\otimes \langle m_B|)|\Psi\rangle  
}{  
\sqrt{p_\Psi(m_B)}  
},  
$$

其中

# $$  
p_\Psi(m_B)

|(I_A\otimes \langle m_B|)|\Psi\rangle|^2.  
$$

于是一个 global state $|\Psi\rangle$ 会生成一个 projected ensemble

# $$  
E(|\Psi\rangle,M_B)
=
\{p_\Psi(m_B),|\psi_{\Psi,m_B}\rangle\}_{m_B}.  
$$

但是这里有一个重要区别：

- 在理论上，我们经常研究整个 generator ensemble $D$ 产生的 combined projected ensemble：
    

# $$  
E(D,M_B)
=
\{p_dp_d(m_B),|\psi_{d,m_B}\rangle\}_{d,m_B}.  
$$

- 在实验或 single-instance realization 中，我们通常只采样一个 global state $|\Psi_s\rangle\sim D$，然后研究它产生的 projected ensemble：
    

$$  
E(|\Psi_s\rangle,M_B).  
$$

因此，一个核心问题是：

> 单个 typical global state 生成的 projected ensemble，是否真的能代表整个 generator ensemble 生成的 combined projected ensemble？

这就是 ensemble typicality 要回答的问题。

---

## 1. Ensemble typicality 是什么？

直观地说，ensemble typicality 表示：

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E(D,M_B)  
$$

for typical $|\Psi_s\rangle\sim D$.

也就是说，虽然 $E(D,M_B)$ 是把 $D$ 中所有 global states 都平均进去得到的 combined object，但如果 $D$ 具有 ensemble typicality，那么绝大多数 single global instances $|\Psi_s\rangle$ 自己生成的 projected ensemble 已经和 $E(D,M_B)$ 统计等价。

这件事非常关键，因为我们真正想预测的往往是 single-instance projected ensemble：

$$  
E(|\Psi_s\rangle,M_B),  
$$

但理论上更容易处理的是 ensemble-averaged object：

$$  
E(D,M_B).  
$$

如果 ensemble typicality 成立，那么我们就可以用

$$  
E(D,M_B)  
$$

作为 typical projected ensemble 的 statistical representative。

---

## 2. 为什么它对 SAI principle 很重要？

在 projected-ensemble setting 中，combined projected ensemble 可以看成一个 full information channel：

$$  
(D,M_B)\rightarrow M_A.  
$$

这里 label $D$ 表示 global-state microscopic label，label $M_B$ 表示 $B$ 上的 measurement outcome，而 $M_A$ 是 observer 在 $A$ 上做 measurement 得到的 outcome。

如果 $D$ 具有 ensemble typicality，我们期望：

1. 不同 $|\Psi_s\rangle\sim D$ 共享相同的 universal physical features；
    
2. global-state label $D$ 主要记录 microscopic instance-to-instance fluctuation；
    
3. 这些 universal physical features 已经可以由 global density matrix
    

# $$  
\rho_D
=
\sum_d p_d |\Psi_d\rangle\langle\Psi_d|  
$$

捕捉；  
4. 因此 full channel

$$  
(D,M_B)\rightarrow M_A  
$$

可以被 coarse-grained effective channel

$$  
M_B\rightarrow M_A  
$$

近似代表。

这个 coarse-grained effective channel 对应的 quantum encoding 就是 meta ensemble：

# $$  
\mathcal E_{\mathrm{Meta}}
=
\{p(m_B),\rho_A(m_B)\}_{m_B},  
$$

其中

# $$  
p(m_B)
=
\mathrm{Tr}\left[  
(I_A\otimes |m_B\rangle\langle m_B|)  
\rho_D  
\right],  
$$

# $$  
\rho_A(m_B)
=
\frac{  
(I_A\otimes \langle m_B|)  
\rho_D  
(I_A\otimes |m_B\rangle)  
}{  
p(m_B)  
}.  
$$

然后你们的 information-minimization principle 说：

> 在固定 meta ensemble 的所有 probabilistic refinements 中，真实出现的 projected ensemble 应该 minimize surplus accessible information, 即 microscopic label $D$ 额外携带的 locally accessible information 应该尽可能小。

因此，projected ensemble 的 universal prediction 是

$$  
E(D,M_B)  
\approx  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}],  
$$

其中

# $$  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}]
=
\sum_{m_B}  
p(m_B)E_{\mathrm{Scr.}}[\rho_A(m_B)].  
$$

如果再结合 ensemble typicality，则得到 single-instance prediction：

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}].  
$$

所以逻辑链条是：

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E(D,M_B)  
\approx  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}].  
$$

第一步是 ensemble typicality，第二步是 SAI minimization principle 的 prediction。

因此，ensemble typicality 不是一个可有可无的修辞装饰，而是让整个 projected-ensemble prediction 从 ensemble-level object 落到 typical single-instance object 的桥梁。

---

## 3. 我们到底想验证什么？

对于一个 projected-ensemble evidence，我们最好区分两件事。

### A. Ensemble typicality

要验证的是：

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E(D,M_B)  
$$

for typical $|\Psi_s\rangle\sim D$.

也就是说，single global instance 的 projected ensemble 是否接近 combined projected ensemble。

### B. Principle prediction

要验证的是：

$$  
E(D,M_B)  
\approx  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}]  
$$

或者更直接地：

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}].  
$$

前者是验证 principle 的适用前提，后者是验证 principle 的预测结果。

在实际操作中，如果我们直接证明或数值显示

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}],  
$$

那么这通常是一个 combined verification：它同时支持 ensemble typicality 和 universal target prediction。

不过在写作上最好说清楚：

- ensemble typicality explains why a typical single instance can be represented by an ensemble-level object；
    
- SAI minimization explains why the ensemble-level object should be GSE / GRSE / Haar / other universal ensemble。
    

---

## 4. 为什么用 moments 来验证？

一个 quantum ensemble 不仅由 first moment，即 density matrix，决定。两个不同 ensemble 可以有相同的 density matrix，但具有完全不同的 pure-state distribution。

因此，要比较两个 ensembles 的 statistical distribution，需要比较 higher moments：

# $$  
\rho^{(k)}_E
=
\mathbb E_{\psi\sim E}  
\left[  
(|\psi\rangle\langle\psi|)^{\otimes k}  
\right].  
$$

如果对所有 $k$ 都相同，那么在适当条件下，ensemble distribution 被完全确定。

但在实际理论和数值中，我们通常验证 fixed finite $k$，例如 $k=2,3$。这对应 projected design / finite-moment typicality 的 operational version。

所以我们不试图证明：

# $$  
E(|\Psi_s\rangle,M_B)
\approx
E(D,M_B)  
$$

作为完整 distribution 的严格相等。

我们验证的是 fixed-$k$ moment convergence：

$$  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}  
\approx  
\rho^{(k)}_{E(D,M_B)}.  
$$

这就是 ensemble typicality 的 finite-$k$ 可验证版本。

---

# 第一档验证：Analytic Moment-Concentration Proof

## 5. 定义 single-instance projected moment

给定一个 sampled global state $|\Psi_s\rangle\sim D$，它生成的 projected ensemble 为

# $$  
E(|\Psi_s\rangle,M_B)
=
\{p_s(m_B),|\psi_{s,m_B}\rangle\}_{m_B}.  
$$

其 $k$-th moment 定义为

# $$  
\rho^{(k)}_{s,M_B}
=
\sum_{m_B}  
p_s(m_B)  
\left(  
|\psi_{s,m_B}\rangle\langle \psi_{s,m_B}|  
\right)^{\otimes k}.  
$$

这里 $s$ 是 random label，因为 $|\Psi_s\rangle$ 是从 $D$ 中随机抽样得到的。

---

## 6. 定义 ensemble-level projected moment

对于整个 generator ensemble

$$  
D={p_d,|\Psi_d\rangle},  
$$

combined projected ensemble 是

# $$  
E(D,M_B)
=
\{p_d p_d(m_B),|\psi_{d,m_B}\rangle\}_{d,m_B}.  
$$

其 $k$-th moment 为

# $$  
\rho^{(k)}_{D,M_B}
=
\mathbb E_{\Psi\sim D}  
\left[  
\sum_{m_B}  
p_\Psi(m_B)  
\left(  
|\psi_{\Psi,m_B}\rangle  
\langle \psi_{\Psi,m_B}|  
\right)^{\otimes k}  
\right].  
$$

等价地，

# $$  
\rho^{(k)}_{D,M_B}
=
\mathbb E_{\Psi\sim D}  
\rho^{(k)}_{\Psi,M_B}.  
$$

---

## 7. 定义 universal target moment

如果根据 symmetry / conservation law / meta ensemble，我们已经知道 principle prediction 的 target 是

$$  
E_{\mathrm{target}},  
$$

例如

# $$  
E_{\mathrm{target}}
=
E_{\mathrm{GSE}}[\mathcal E_{\mathrm{Meta}}],  
$$

或者 Real case 中的

# $$  
E_{\mathrm{target}}
=
E_{\mathrm{GRSE}}[\mathcal E_{\mathrm{Meta}}],  
$$

则定义 target moment：

# $$  
\rho^{(k)}_{\mathrm{target}}
=
\rho^{(k)}_{E_{\mathrm{target}}}.  
$$

此时可以比较：

$$  
\rho^{(k)}_{s,M_B}  
\quad \text{with} \quad  
\rho^{(k)}_{\mathrm{target}}.  
$$

这会同时检验 single-instance projected ensemble 是否趋近 predicted universal ensemble。

---

## 8. 定义 moment-distance diagnostic

### 8.1 Ensemble typicality distance

最直接检验 ensemble typicality 的量是：

# $$  
\Delta^{(k)}_{\mathrm{ET}}(s)

= \frac12  
\left|  
\rho^{(k)}_{s,M_B}
-
\rho^{(k)}_{D,M_B}  
\right|_1.  
$$

其中 $|\cdot|_1$ 是 trace norm。

如果

$$  
\Delta^{(k)}_{\mathrm{ET}}(s)\to 0  
$$

for typical $s$，则说明

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E(D,M_B)  
$$

in the fixed-$k$ moment sense。

---

### 8.2 Target distance

如果我们直接比较 universal target，则定义：

# $$  
\Delta^{(k)}_{\mathrm{target}}(s)

= \frac12  
\left|  
\rho^{(k)}_{s,M_B}
-
\rho^{(k)}_{\mathrm{target}}  
\right|_1.  
$$

如果

$$  
\Delta^{(k)}_{\mathrm{target}}(s)\to 0  
$$

for typical $s$，则说明

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E_{\mathrm{target}}  
$$

in the fixed-$k$ moment sense。

---

## 9. 最理想的 theorem statement

第一档 analytic verification 最好证明如下定理。

**Theorem: finite-$k$ ensemble typicality.**  
For fixed subsystem size $N_A$, fixed moment order $k$, and increasing environment size $N_B$, a sampled global state $|\Psi_s\rangle\sim D$ satisfies

$$  
\mathbb E_{\Psi_s\sim D}  
\Delta^{(k)}_{\mathrm{ET}}(s)  
\le  
\varepsilon_k(N_B),  
$$

where

$$  
\varepsilon_k(N_B)\to 0  
\qquad  
\text{as}  
\qquad  
N_B\to\infty.  
$$

Equivalently,

## $$  
\mathbb E_{\Psi_s\sim D}  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}
-
\rho^{(k)}_{E(D,M_B)}  
\right|_1  
\le  
\varepsilon_k(N_B).  
$$

This establishes ensemble typicality in the fixed-$k$ moment sense.

---

如果 universal target 已知，也可以证明更直接的版本：

**Theorem: finite-$k$ convergence to the universal target.**  
For fixed $N_A$ and fixed $k$,

## $$  
\mathbb E_{\Psi_s\sim D}  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}
-
\rho^{(k)}_{\mathrm{target}}  
\right|_1  
\le  
\widetilde{\varepsilon}_k(N_B),  
$$

where

$$  
\widetilde{\varepsilon}_k(N_B)\to 0  
\qquad  
\text{as}  
\qquad  
N_B\to\infty.  
$$

This shows that the projected ensemble generated from a typical global instance converges to the predicted universal ensemble.

---

## 10. 从 average bound 得到 typical-state statement

注意

$$  
\Delta^{(k)}_{\mathrm{ET}}(s)\ge 0.  
$$

如果已经证明

$$  
\mathbb E_s \Delta^{(k)}_{\mathrm{ET}}(s)  
\le  
\varepsilon_k(N_B),  
$$

那么由 Markov inequality，

$$  
\Pr_s  
\left[  
\Delta^{(k)}_{\mathrm{ET}}(s)>\eta  
\right]  
\le  
\frac{  
\varepsilon_k(N_B)  
}{\eta}.  
$$

因此，只要

$$  
\varepsilon_k(N_B)\to 0,  
$$

就有

$$  
\Pr_s  
\left[  
\Delta^{(k)}_{\mathrm{ET}}(s)>\eta  
\right]  
\to 0  
$$

for any fixed $\eta>0$。

也就是说，

$$  
\Delta^{(k)}_{\mathrm{ET}}(s)  
\xrightarrow{p}  
0.  
$$

这说明 fixed-$k$ moment distance 对 typical sampled global state vanish in probability。

因此，average trace-distance bound 自动给出 typical-state convergence in probability。

---

## 11. 证明路线

一个 analytic moment-concentration proof 通常分成三步。

---

### Step 1: 写出 projected moment 的显式表达

首先展开

# $$  
\rho^{(k)}_{s,M_B}
=
\sum_{m_B}  
p_s(m_B)  
\left(  
|\psi_{s,m_B}\rangle\langle \psi_{s,m_B}|  
\right)^{\otimes k}.  
$$

由于

# $$  
|\psi_{s,m_B}\rangle

\frac{  
(I_A\otimes \langle m_B|)|\Psi_s\rangle  
}{  
\sqrt{p_s(m_B)}  
},  
$$

所以

$$  
p_s(m_B)  
\left(  
|\psi_{s,m_B}\rangle\langle \psi_{s,m_B}|  
\right)^{\otimes k}  
$$

会包含 normalization factor

$$  
p_s(m_B)^{1-k}.  
$$

对于 $k=1$，这个表达式是 linear 的：

# $$  
p_s(m_B)  
|\psi_{s,m_B}\rangle\langle\psi_{s,m_B}|

(I_A\otimes \langle m_B|)  
|\Psi_s\rangle\langle\Psi_s|  
(I_A\otimes |m_B\rangle).  
$$

但对于 $k>1$，它是 rational function，因此需要额外控制

$$  
p_s(m_B)  
$$

不能太小。

这通常需要一个 well-conditioned assumption，例如：

$$  
p_s(m_B)  
\approx  
p(m_B)  
$$

且

$$  
p(m_B)  
\ge p_{\min}>0  
$$

在 relevant measurement outcomes 上成立。

---

### Step 2: 证明 ensemble average 的 projected moment 接近 target

下一步证明：

$$  
\mathbb E_{\Psi_s\sim D}  
\rho^{(k)}_{s,M_B}  
\approx  
\rho^{(k)}_{\mathrm{target}}.  
$$

不同 $D$ 对应不同技术：

#### Haar-type ensemble

如果 $D$ 是 Haar ensemble，可以使用 Haar integration / Weingarten calculus。

#### Symmetry-constrained Haar ensemble

如果 $D$ 是 symmetry-resolved Haar ensemble，例如 U(1)-symmetric 或 $D_3$-symmetric Haar ensemble，需要先分解 symmetry sectors，再在每个 allowed sector 中做 Haar average。

#### Scrooge-type ensemble

如果 $D$ 本身是 Scrooge ensemble，可以使用 Scrooge ensemble 的 known moment formula。

#### New structured ensemble

如果 $D$ 是新的结构，例如 Real Scrooge 或 $D_3$-symmetric ensemble，则需要证明它在 projected level 上形成某种 approximate projected design / relative Scrooge design。

目标是得到：

## $$  
\left|  
\mathbb E_{\Psi_s\sim D}  
\rho^{(k)}_{s,M_B}

\rho^{(k)}_{\mathrm{target}}  
\right|_1  
\le  
\varepsilon^{\mathrm{bias}}_k(N_B),  
$$

其中

$$  
\varepsilon^{\mathrm{bias}}_k(N_B)\to 0.  
$$

这一项可以理解为 bias error：ensemble average 的 projected moment 是否等于 target moment。

---

### Step 3: 证明 single-instance moment concentration around average

然后证明 single instance 不仅平均上对，而且大多数 sample 都接近这个 average：

## $$  
\mathbb E_{\Psi_s\sim D}  
\left|  
\rho^{(k)}_{s,M_B}

\mathbb E_{\Psi\sim D}  
\rho^{(k)}_{\Psi,M_B}  
\right|_1  
\le  
\varepsilon^{\mathrm{conc}}_k(N_B),  
$$

其中

$$  
\varepsilon^{\mathrm{conc}}_k(N_B)\to 0.  
$$

这一项是 concentration error：sample-to-sample fluctuation 是否消失。

在实际证明中，常常先证明 Hilbert-Schmidt norm 的二阶矩 bound：

## $$  
\mathbb E_{\Psi_s\sim D}  
\left|  
\rho^{(k)}_{s,M_B}

\rho^{(k)}_{D,M_B}  
\right|_2^2  
\le  
\delta_k(N_B).  
$$

然后用 norm inequality：

$$  
|X|_1  
\le  
\sqrt{\mathrm{rank}(X)}|X|_2.  
$$

因为 $\rho^{(k)}$ 作用在 $\mathcal H_A^{\otimes k}$ 上，所以

$$  
\mathrm{rank}(X)  
\le  
D_A^k.  
$$

因此

$$  
|X|_1  
\le  
D_A^{k/2}|X|_2.  
$$

于是

$$  
\mathbb E|X|_1  
\le  
D_A^{k/2}  
\sqrt{  
\mathbb E|X|_2^2  
}.  
$$

如果

$$  
\mathbb E|X|_2^2  
\le  
\delta_k(N_B),  
$$

则得到

$$  
\mathbb E|X|_1  
\le  
D_A^{k/2}  
\sqrt{\delta_k(N_B)}.  
$$

所以只要

$$  
D_A^{k/2}\sqrt{\delta_k(N_B)}  
\to 0,  
$$

就得到 trace-norm concentration。

---

## 12. Error decomposition

如果直接比较 target，可以使用 triangle inequality：

## $$  
\begin{aligned}  
&  
\left|  
\rho^{(k)}_{s,M_B}

## \rho^{(k)}_{\mathrm{target}}  
\right|_1  
\  
&\le  
\left|  
\rho^{(k)}_{s,M_B}

## \rho^{(k)}_{D,M_B}  
\right|_1  
+  
\left|  
\rho^{(k)}_{D,M_B}

\rho^{(k)}_{\mathrm{target}}  
\right|_1.  
\end{aligned}  
$$

也就是

$$  
\Delta^{(k)}_{\mathrm{target}}(s)  
\le  
\Delta^{(k)}_{\mathrm{ET}}(s)  
+  
\Delta^{(k)}_{\mathrm{bias}}.  
$$

其中

# $$  
\Delta^{(k)}_{\mathrm{ET}}(s)

## \frac12  
\left|  
\rho^{(k)}_{s,M_B}

\rho^{(k)}_{D,M_B}  
\right|_1  
$$

是 ensemble typicality error，而

# $$  
\Delta^{(k)}_{\mathrm{bias}}

## \frac12  
\left|  
\rho^{(k)}_{D,M_B}

\rho^{(k)}_{\mathrm{target}}  
\right|_1  
$$

是 ensemble-level target error。

这让逻辑非常清楚：

- 第一项说明 typical single instance 是否代表 full ensemble；
    
- 第二项说明 full ensemble 是否由 GSE / GRSE / Haar 等 target 描述。
    

如果两项都 vanish，则

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E_{\mathrm{target}}  
$$

in the fixed-$k$ moment sense。

---

## 13. 最终可写成的 conclusion

如果我们证明了

$$  
\mathbb E_s  
\Delta^{(k)}_{\mathrm{ET}}(s)  
\le  
\varepsilon^{\mathrm{conc}}_k(N_B)  
$$

且

$$  
\Delta^{(k)}_{\mathrm{bias}}  
\le  
\varepsilon^{\mathrm{bias}}_k(N_B),  
$$

那么

$$  
\mathbb E_s  
\Delta^{(k)}_{\mathrm{target}}(s)  
\le  
\varepsilon^{\mathrm{conc}}_k(N_B)  
+  
\varepsilon^{\mathrm{bias}}_k(N_B).  
$$

如果

$$  
\varepsilon^{\mathrm{conc}}_k(N_B)  
+  
\varepsilon^{\mathrm{bias}}_k(N_B)  
\to 0,  
$$

则

$$  
\mathbb E_s  
\Delta^{(k)}_{\mathrm{target}}(s)  
\to 0.  
$$

由 Markov inequality，对任意固定 $\eta>0$，

$$  
\Pr_s  
\left[  
\Delta^{(k)}_{\mathrm{target}}(s)>\eta  
\right]  
\le  
\frac{  
\varepsilon^{\mathrm{conc}}_k(N_B)  
+  
\varepsilon^{\mathrm{bias}}_k(N_B)  
}{\eta}  
\to 0.  
$$

所以 typical global state 生成的 projected ensemble 会以 high probability 收敛到 predicted target ensemble。

---

## 14. 推荐 theorem 写法

可以在 paper 中写成：

**Theorem.**  
Let $D$ be a global generator ensemble on $\mathcal H_A\otimes\mathcal H_B$, and let $M_B$ be a fixed projective measurement basis on $B$. For fixed subsystem dimension $D_A$ and fixed moment order $k$, suppose that

## $$  
\mathbb E_{\Psi_s\sim D}  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}

\rho^{(k)}_{E(D,M_B)}  
\right|_1  
\le  
\varepsilon^{\mathrm{conc}}_k(D_B),  
$$

and

## $$  
\frac12  
\left|  
\rho^{(k)}_{E(D,M_B)}

\rho^{(k)}_{\mathrm{target}}  
\right|_1  
\le  
\varepsilon^{\mathrm{bias}}_k(D_B),  
$$

where

$$  
\varepsilon^{\mathrm{conc}}_k(D_B),  
\varepsilon^{\mathrm{bias}}_k(D_B)  
\to 0  
$$

as $D_B\to\infty$. Then

## $$  
\mathbb E_{\Psi_s\sim D}  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}

\rho^{(k)}_{\mathrm{target}}  
\right|_1  
\to 0.  
$$

Consequently, for any fixed $\eta>0$,

## $$  
\Pr_{\Psi_s\sim D}  
\left[  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}

\rho^{(k)}_{\mathrm{target}}  
\right|_1

\eta  
\right]  
\to 0.  
$$

Thus, the projected ensemble generated from a typical global instance converges to the target ensemble in the fixed-$k$ moment sense.

---

## 15. 适用于不同 examples 的解释

### Known examples

对于 chaotic eigenstates、Haar ensemble、U(1)-symmetric Haar ensemble、Scrooge ensemble 等，如果已有文献证明了 projected-design convergence 或 deep-thermalization behavior，则不需要重新证明 ensemble typicality。

可以写：

> In these examples, the finite-$k$ ensemble typicality input is supplied by existing projected-design / deep-thermalization results.

### New examples

对于 Real Scrooge Ensemble、$D_3$-symmetric Haar Ensemble 等新 evidence，最好给出直接验证。

最理想的是证明：

## $$  
\mathbb E_s  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}

\rho^{(k)}_{\mathrm{target}}  
\right|_1  
\le  
\varepsilon_k(N),  
$$

其中

$$  
\varepsilon_k(N)\to 0.  
$$

如果 analytic proof 太难，也至少数值验证：

$$  
\mathbb E_s \Delta^{(k)}_{\mathrm{target}}(s)  
$$

随 $N$ 指数或幂律衰减，并且给出 error bars / variance / quantiles 来说明 typicality 不只是 average behavior。

---

## 16. 推荐正文表述

可以这样写：

> In this work, ensemble typicality is used as a structural assumption specifying the regime of applicability of the information-minimization principle. Operationally, we verify it in the finite-moment sense. For each fixed moment order $k$, we compare the $k$-th moment of the projected ensemble generated from a typical global instance with that of the ensemble-level projected ensemble:
> 
> # $$  
> \Delta^{(k)}_{\mathrm{ET}}(s)
> 
> ## \frac12  
> \left|  
> \rho^{(k)}_{E(|\Psi_s\rangle,M_B)}
> 
> \rho^{(k)}_{E(D,M_B)}  
> \right|_1.  
> $$
> 
> Ensemble typicality is established when
> 
> $$  
> \mathbb E_s\Delta^{(k)}_{\mathrm{ET}}(s)\to 0  
> $$
> 
> as the environment size grows. By Markov's inequality, this implies convergence in probability for typical sampled global states.

如果直接对 target 验证，可以写：

> When the ensemble-level projected ensemble is known or predicted to converge to a universal target $E_{\mathrm{target}}$, such as a GSE or GRSE determined by the meta ensemble, we verify the stronger combined statement
> 
> ## $$  
> \mathbb E_s  
> \frac12  
> \left|  
> \rho^{(k)}_{E(|\Psi_s\rangle,M_B)}
> 
> \rho^{(k)}_{E_{\mathrm{target}}}  
> \right|_1  
> \to 0.  
> $$
> 
> This simultaneously supports the finite-$k$ version of ensemble typicality and the predicted universal form of the projected ensemble.

---

## 17. 需要避免的说法

不要写：

> We prove that the projected ensemble is exactly GSE.

更稳的是：

> We prove convergence of fixed-$k$ moments to those of the predicted GSE.

也不要写：

> Average convergence proves almost-sure typicality.

更严谨的是：

> Average convergence implies convergence in probability for typical sampled states.

如果想使用 “almost all states” 这类语言，最好加上限定：

> in the thermodynamic limit and in the fixed-$k$ operational sense.

---

## 18. 一句话总结

第一档验证的核心是：

## $$  
\boxed{  
\mathbb E_{\Psi_s\sim D}  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}

\rho^{(k)}_{E(D,M_B)}  
\right|_1  
\to 0  
}  
$$

这验证 ensemble typicality。

如果 universal target 已知，则可以验证更强的 combined statement：

## $$  
\boxed{  
\mathbb E_{\Psi_s\sim D}  
\frac12  
\left|  
\rho^{(k)}_{E(|\Psi_s\rangle,M_B)}

\rho^{(k)}_{\mathrm{target}}  
\right|_1  
\to 0  
}  
$$

这同时支持：

$$  
E(|\Psi_s\rangle,M_B)  
\approx  
E(D,M_B)  
$$

以及

$$  
E(D,M_B)  
\approx  
E_{\mathrm{target}}.  
$$

因此，analytic moment-concentration proof 是验证 ensemble typicality 以及 projected-ensemble universal prediction 的最干净方式。